import Attestation from "../models/attestation"
import User from "../models/user"
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from "../middleware/authMiddleware";
import axios from "axios";
import Notification from "../models/notification";

export const addAttestation = async (req:Request, res: Response) => {
    let textmsg
    try{
        const{title,attachments}=req.body
        const{userId}=req.query;
       
       
        const attestation = await Attestation.create({title,attachments,student:userId})
        textmsg =`You have a new ${attestation.title} `
  await Notification.create({
    student:userId,
    notiType:"alert",
    text:textmsg,
    attestation:attestation?._id
  
  });
        res.status(200).json(attestation);

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}
export const addRequest = async (req: CustomRequest, res: Response) => {
  let textmsg:String;
  console.log(req.body)
  try {
    const { userId } = req.user!;
    const { title } = req.body;
    
    // Fetch all admin users
    const adminUsers = await User.find({ isAdmin: true });
    
    // Create an attestation for the student
    const attestation = await Attestation.create({
      title,
      student: userId,
      requested: true,
    });
    
    // Notification message
    textmsg = `You have a new Request for ${attestation.title}`;
    
    // Create notifications for each admin
    await Promise.all(adminUsers.map(admin => {
      return Notification.create({
        student: admin._id,
        notiType: "alert",
        text: textmsg,
        attestation: attestation._id,
      });
    }));
    
    res.status(200).json(attestation);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};


export const updateAttestation = async (req: Request, res: Response) => {
    try {
      const { _id, title, attachments } = req.body;
  
      // Validate _id
      if (!_id) {
        return res.status(400).json({ status: false, message: "ID is required" });
      }
  
      // Find the attestation
      const attest = await Attestation.findById(_id);
      if (!attest) {
        return res.status(404).json({ status: false, message: "Attestation not found" });
      }
      let textmsg
      // Update fields
      attest.title = title || attest.title;
      attest.attachments = attachments || attest.attachments;
      attest.requested = false;
      // Save updated attestation
      const updatedAttest = await attest.save();
      textmsg = `You have a new Document uploaded for you`;
      Notification.create({
        student:  updatedAttest.student,
        notiType: "alert",
        text: textmsg,
        attestation:  updatedAttest._id,
      });
  
      res.status(200).json({
        status: true,
        message: "Document updated successfully",
        Attest: updatedAttest,
      });
  
    } catch (error: any) {
      console.error("Error updating attestation:", error);
      res.status(500).json({ status: false, message: error.message });
    }
  };

export const getAttData = async (req: CustomRequest, res: Response) => {
    const{userId,isAdmin}=req.user!;
  
    try {
      
        
      const attestation = await Attestation.find({student:userId}).sort({ createdAt: -1 });
  
    
  
      res.status(200).json({ status: true, attestation });
    } catch (error: any) {
      res.status(400).json({ status: false, message: error.message });
    }
  };

  export const getAdminAttestData = async (req: CustomRequest, res: Response) => {
    const { search } = req.query;

    try {
        let matchStage: any = {};

        if (search && search !== "") {
            matchStage.$or = [
                { title: { $regex: search, $options: "i" } },
                { "student.wilaya": { $regex: search, $options: "i" } },
                { "student.surname": { $regex: search, $options: "i" } },
                { "student.firstname": { $regex: search, $options: "i" } },
                { "student.passportnumber": { $regex: search, $options: "i" } }
            ];
        }

        const attestations = await Attestation.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "student",
                    foreignField: "_id",
                    as: "student"
                }
            },
            { $unwind: "$student" },
            { $match: matchStage },
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    title: 1,
                    attachments: 1,
                    createdAt: 1,
                    requested: 1, // Add requested field here
                    "student.firstname": 1,
                    "student.surname": 1,
                    "student.wilaya": 1,
                    "student.passportnumber": 1
                }
            }
        ]);
       

        res.status(200).json({ status: true, attestations });
    } catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }
};

  

  export const deleteAttestation = async (req: Request, res: Response) => {
    const { id } = req.query;
    try{
        await Attestation.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
          });

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}
export const deleteAllAttestation = async (req: Request, res: Response) => {
   
    try{
        await Attestation.deleteMany({});
        return res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
          });

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}
export const getNotificationsList=async(req:CustomRequest,res:Response)=>{
  try{
      const {userId} = req.user!
      const notice = await Notification.find({
          student:userId,
          isRead:{$nin:[userId]}
      })
      res.status(200).json(notice)

  }catch(error:any){
      console.log(error)
      return res.status(400).json({status:false, message:error.message})
  }
}
export const markNotificationRead=async(req:CustomRequest,res:Response)=>{
  try{
      const{userId}= req.user!
      const {isReadType,id}= req.query
      if(isReadType==="all"){
          await Notification.updateMany({student:userId,isRead:{$nin:[userId]}},{$push:{isRead:userId}},{new:true})
      }
      else {
          await Notification.findOneAndUpdate(
            { _id: id, isRead: { $nin: [userId] } },
            { $push: { isRead: userId } },
            { new: true }
          );
        }
    
        res.status(201).json({ status: true, message: "Done" });

  }catch(error:any){
      console.log(error)
      return res.status(400).json({status:false, message:error.message})
  }

}

export const downloadAttestation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
      // Fetch the item from your database
      const item = await Attestation.findById(id);

      if (!item) {
          return res.status(404).json({ status: false, message: "Item not found" });
      }

      // Get the file URL from the item
      const fileUrl = item.attachments?.[item?.attachments?.length-1];
      if (!fileUrl) {
          return res.status(404).json({ status: false, message: "No attachments found for this item" });
      }

      // Fetch the file from Firebase Storage
      const response = await axios.get(fileUrl, { responseType: 'stream' });

      // Extract filename and content-type from URL or set defaults
      const fileName = fileUrl.split('/').pop() || "attestation-docs";
      const contentType = response.headers['content-type'] || 'application/octet-stream';

      // Set response headers
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', contentType);

      // Pipe the file stream to the response
      response.data.pipe(res);
  } catch (error: any) {
      console.error('Server error:', error);
      res.status(500).json({ status: false, message: error.message });
  }
};