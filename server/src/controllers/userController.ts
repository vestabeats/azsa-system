import User from "../models/user"
import { Request, Response, NextFunction } from 'express';
import { createJWT } from "../utils/index"
import { CustomRequest } from "../middleware/authMiddleware";


export const registerUser =async(req:Request,res:Response)=>{
    try{
        const{surname,firstname,dob,startdate,wilaya,sex,enddate,phonenumber,year,email,mother,father,homeadress,degreetype,
            passportnumber,passportphoto,program,parentnumber,university,speciality,isAdmin,isActive,isCreator,isOfficials }=req.body;
        const userExist = await User.findOne({passportnumber})
        if(userExist){
            
            return res.status(400).json({status:false, message:"user already exists"})
        }

        const user =  await User.create({surname,firstname,dob,startdate,wilaya,sex,enddate,phonenumber,year,email,mother,father,homeadress,degreetype,
            passportnumber,password:passportnumber,passportphoto,program,university,speciality,parentnumber,isAdmin,isActive,isCreator,isOfficials})
            if(user){
                isAdmin ? createJWT(res,user?._id):null
                user.password = undefined
                res.status(201).json(user)
            }else{
                res.status(400).json({status:false, message:"invalid user data"})
            }
        

    }catch(error){
        console.log(error)
        return res.status(400).json({status:false, message:"registering a user failure"})
    }

}



export const loginUser =async(req:Request,res:Response)=>{
    try{
        const {passportnumber,password} = req.body;
        const user = await User.findOne({passportnumber})
        if(!user){
            
            return res.status(401).json({status:false, message:"invalid passportnumber or password"})
            }
        if(!user?.isActive){
        
            return res.status(401).json({status:false, message:"user account has been deactivated, contact the administration"})
        }
        const isMatch = await user.matchPassword(password)
        if(user && isMatch){
            createJWT(res,user._id)
            user.password = undefined

            res.status(200).json(user)
        }else{
            return res.status(401).json({status:false, message:"invalid password"})
        }

    }catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return res.status(400).json({ status: false, message: error.message });
        } else {
            // Handle unexpected error types
            console.log("Unexpected error", error);
            return res.status(400).json({ status: false, message: "An unexpected error occurred" });
        }
    }
}
export const logOutUser = async (req: Request, res: Response) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0), // Correcting the property name to "expires"
        });
        return res.status(200).json({ status: true, message: "Logout successful" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return res.status(400).json({ status: false, message: error.message });
        } else {
            // Handle unexpected error types
            console.log("Unexpected error", error);
            return res.status(400).json({ status: false, message: "An unexpected error occurred" });
        }
    }
};

export const getStudents = async (req: Request, res: Response) => {
    try {
        const { wilaya, search, isActive ,isTrashed} = req.query;

        // Initialize the query object with appropriate types
        let query: any = {isAdmin:false};
        query.isTrashed=isTrashed==="true"
        // Handle isActive query parameter
       

        // Handle wilaya query parameter
        if (wilaya) {
            query.wilaya = wilaya;
        }
        if (isActive ==="active") {
          query.isActive = isActive ==='active';
      }else if(isActive ==="inactive"){
        query.isActive = false;
      }

        // Handle search query parameter
        if (search !=="") {
          // Example: searching by surname or firstname
          query.$or = [
              { surname: { $regex: search, $options: "i" } },
              { firstname: { $regex: search, $options: "i" } },
              { passportnumber: { $regex: search, $options: "i" } },
              { program :{ $regex: search, $options: "i" } },
              { sex :{ $regex: search, $options: "i" } }
              
          ];
      }
        
        // Execute the query
        const users = await User.find(query).lean(); // Use .lean() to return plain JavaScript objects

        // Send response
        res.status(200).json({ status: true, users });
       
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return res.status(400).json({ status: false, message: error.message });
        } else {
            // Handle unexpected error types
            console.log("Unexpected error", error);
            return res.status(400).json({ status: false, message: "An unexpected error occurred" });
        }
    }
};

export const updateUserProfile = async (req: CustomRequest, res: Response) => {
    try {
      
      const { _id, email, passportnumber } = req.body;
      const{isAdmin}=req.user!
    
      const user = await User.findById(_id);
  
      if (user) {
        // Update user fields
        user.surname = req.body.surname || user.surname;
        user.firstname = req.body.firstname || user.firstname;
        user.dob = req.body.dob || user.dob;
        user.startdate = req.body.startdate || user.startdate;
        user?.isAdmin? user.wilaya = "":user.wilaya = req.body.wilaya || user.wilaya;
        //user.wilaya = req.body.wilaya || user.wilaya;
        user.sex = req.body.sex || user.sex;
        user.enddate = req.body.enddate || user.enddate;
        user.phonenumber = req.body.phonenumber || user.phonenumber;
        user?.isAdmin? user.year = "":user.year = req.body.year || user.year;
        //user.year = req.body.year || user.year;
        user.email = email || user.email; // Update email if provided
        user.mother = req.body.mother || user.mother;
        user.father = req.body.father || user.father;
        user.homeadress = req.body.homeadress || user.homeadress;
        user.degreetype = req.body.degreetype || user.degreetype;
        user.passportnumber = passportnumber || user.passportnumber; // Update passport number if provided
        user.passportphoto = req.body.passportphoto || user.passportphoto;
        user.program = req.body.program || user.program;
        user.parentnumber = req.body.parentnumber || user.parentnumber;
        user.university = req.body.university || user.university;
        user.speciality = req.body.speciality || user.speciality;
        user.isOfficials = req.body.isOfficials  || user.isOfficials ;
        user.isAdmin = req.body.isAdmin ?? user.isAdmin;
  
        const updatedUser = await user.save();
  
        updatedUser.password = undefined;
  
        res.status(201).json({
          status: true,
          message: "Profile Updated Successfully.",
          user: updatedUser,
        });
      } else {
        res.status(404).json({ status: false, message: "User not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
      } else {
        console.log("Unexpected error", error);
        return res.status(400).json({ status: false, message: "An unexpected error occurred" });
      }
    }
  };

  export const activateUserProfile = async (req:Request, res:Response) => {
    try {
      const { id } = req.params;
  
      const user = await User.findById(id);
  
      if (user) {
        user.isActive = req.body.isActive; //!user.isActive
  
        await user.save();
  
        res.status(201).json({
          status: true,
          message: `User account has been ${
            user?.isActive ? "activated" : "disabled"
          }`,
        });
      } else {
        res.status(404).json({ status: false, message: "User not found" });
      }
    } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);
          return res.status(400).json({ status: false, message: error.message });
        } else {
          console.log("Unexpected error", error);
          return res.status(400).json({ status: false, message: "An unexpected error occurred" });
        }
      }
  };

  export const deleteUserProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
      }
  
      user.isTrashed = true;
      await user.save();
  
      return res
        .status(200)
        .json({ status: true, message: "User trashed successfully" });
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };
  
  export const deleteRestoreUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { actionType } = req.query as { actionType?: string };
  
      if (actionType === "delete") {
        await User.findByIdAndDelete(id);
      } else if (actionType === "deleteAll") {
        await User.deleteMany({ isTrashed: true });
      } else if (actionType === "restore") {
        const resp = await User.findById(id);
        if (!resp) {
          return res.status(404).json({ status: false, message: "User not found" });
        }
  
        resp.isTrashed = false;
        await resp.save();
      } else if (actionType === "restoreAll") {
        await User.updateMany(
          { isTrashed: true },
          { $set: { isTrashed: false } }
        );
      }
  
      return res.status(200).json({
        status: true,
        message: `Operation performed successfully.`,
      });
  
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };

  export const adminChangeUserPassword=async(req:Request,res:Response)=>{
    const { userId } = req.query;
  
    try{
        
  
    const user = await User.findById(userId);
 
    if (user) {
      user.password = req.body.password;
  
      await user.save();
  
      user.password = undefined;
  
      res.status(201).json({
        status: true,
        message: `Password changed successfully.`,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  
    }catch (error: any) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  
  }
  export const getUser=async(req:Request,res:Response)=>{
    const {id}=req.params
    try{
      const user = await User.findById(id)
      res.status(200).json(user)
  
    }catch(error:any){
      res.status(400).json({status:false,message:error.message})
    }
  }

  export const sideBarData = async (req: Request, res: Response) => {
    const { isActive } = req.query;
  
    try {
      let query: any = {isTrashed:false};
      if (isActive === 'active') {
        query.isActive = true;
      } else if (isActive === 'inactive') {
        query.isActive = false;
      }
  
      const userData = await User.find(query);
  
      const groupData = Object.entries(
        userData.reduce((result: Record<string, number>, user) => {
          const { wilaya } = user;
          if (wilaya) {
            result[wilaya] = (result[wilaya] || 0) + 1;
          }
          return result;
        }, {})
      ).map(([name, total]) => ({ name, total }));
  
      res.status(200).json({ status: true, data: groupData });
    } catch (error: any) {
      res.status(400).json({ status: false, message: error.message });
    }
  };

  export const getUserStatsByYear = async (req: Request, res: Response) => {
    try {
        const users = await User.find({isAdmin:false, isOfficials:false,isTrashed:false });
        const currentYear = new Date().getFullYear();

        const yearStats: Record<number, number> = users.reduce((acc, user) => {
            // Ensure that startdate and enddate are defined
            if (user.startdate && user.enddate) {
                const startYear = new Date(user.startdate).getFullYear();
                const endYear = Math.min(new Date(user.enddate).getFullYear(), currentYear);

                for (let year = startYear; year <= endYear; year++) {
                    acc[year] = (acc[year] || 0) + 1;
                }
            }

            return acc;
        }, {} as Record<number, number>);

        const stats = Object.keys(yearStats).map(year => ({
            label: `Year ${year}`,
            total: yearStats[parseInt(year)], // Convert string key to number
        }));

        res.status(200).json({ status: true, data: stats });
    } catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }
};

export const getAllUserHistory = async (req: Request, res: Response) => {
  try {
    const { start, end, search,sex,univ,yos,status } = req.query as { start?: number; end?: number; search?: string,sex?: string,univ?: string,yos?: string,status?: string };

    const fil: any = { isAdmin: false, isOfficials: false,isTrashed:false };
    if(status){
      if(status=="switch1"){
        fil.isActive=true
      }else if(status=="switch2"){
        fil.isActive=false
      }
      
    }
    if(sex!=="all"){
      fil.sex=sex
    }
    if(univ!=="all"){
      fil.wilaya=univ
    }
    if(yos!=="all"){
      fil.year=yos
    }

    if (search && search.trim() !== '') {
      // Use a logical OR operator to search by either surname, firstname, or wilaya
      fil.$or = [
        { surname: { $regex: search, $options: 'i' } },
        { firstname: { $regex: search, $options: 'i' } },
        { wilaya: { $regex: search, $options: 'i' } },
        { passportnumber: { $regex: search, $options: 'i' } },
        { program: { $regex: search, $options: 'i' } }
      ];
    }

    // Helper function to validate year input
    const isValidYear = (year: number): boolean => /^\d{4}$/.test(year.toString());

    // Validate the start and end years from the query parameters
    const startYear = start && isValidYear(start) ? start : null;
    const endYear = end && isValidYear(end) ? end : null;

    // Return error if years are invalid
    if ((start && !isValidYear(start)) || (end && !isValidYear(end))) {
      return res.status(400).json({ status: false, message: 'Invalid year format. Please provide a valid four-digit year.' });
    }

    // Initialize filter conditions array
    let filterConditions: Record<string, any>[] = [];

    // Handle the case where both startYear and endYear are provided
    if (startYear !== null && endYear !== null) {
      // Define the start and end dates for the specified years
      const startDate = new Date(`${startYear}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${endYear}-12-31T23:59:59.999Z`);

      // Push the filter conditions for start and end dates
      filterConditions.push({
        startdate: { $gte: startDate, $lte: endDate },
        enddate: { $gte: startDate, $lte: endDate }
      });

      console.log(`Filtering users with start date ${startDate} and end date ${endDate}`);
    } else {
      // Handle cases where only startYear or endYear is provided
      if (startYear !== null) {
        const startDate = new Date(`${startYear}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${startYear}-12-31T23:59:59.999Z`);
        filterConditions.push({ startdate: { $gte: startDate, $lte: endDate } });
        console.log(`Filtering users for the year ${startYear}`);
      }
      if (endYear !== null) {
        const startDate = new Date(`${endYear}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${endYear}-12-31T23:59:59.999Z`);
        filterConditions.push({ enddate: { $gte: startDate, $lte: endDate } });
        console.log(`Filtering users for the year ${endYear}`);
      }
    }

    // Combine the conditions into an $and array if filterConditions are provided
    if (filterConditions.length > 0) {
      fil.$and = filterConditions;
    }

    console.log('Final filter:', JSON.stringify(fil, null, 2));

    const users = await User.find(fil);
    res.status(200).json(users);
  } catch (error: any) {
    console.log('Error:', error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const changeUserPassword=async(req:CustomRequest,res:Response)=>{
  const { userId } = req.user!;
  console.log(userId)
  try{
      

  const user = await User.findById(userId);

  if (user) {
    user.password = req.body.password;

    await user.save();

    user.password = undefined;

    res.status(201).json({
      status: true,
      message: `Password changed successfully.`,
    });
  } else {
    res.status(404).json({ status: false, message: "User not found" });
  }

  }catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }

}

export const getAttache=async(req:Request,res:Response)=>{
  try{
    const attache = await User.find({isAdmin:true})
    return res.status(201).json({
      status: true,
      attache
    });
  }catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
}

export const getOfficials=async(req:Request,res:Response)=>{
  try{
    const officials = await User.find({isOfficials:true})
    return res.status(201).json({
      status: true,
      officials
    });
  }catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
}

export const changeConduct=async(req:Request,res:Response)=>{
  const {id} = req.query
  try{
    const user = await User.findById(id)
    if (user) {
      user.conduct = req.body.conduct; //!user.isActive

      await user.save();

      res.status(201).json({
        status: true,
        message: "changed succesfully",
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
      } else {
        console.log("Unexpected error", error);
        return res.status(400).json({ status: false, message: "An unexpected error occurred" });
      }
    }
}

export const getConduct=async(req:Request,res:Response)=>{
 
  try{
    const user = await User.find({conduct:false})
    res.status(200).json(user)

  }catch(error:any){
    res.status(400).json({status:false,message:error.message})
  }
}