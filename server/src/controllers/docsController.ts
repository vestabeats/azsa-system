import { CustomRequest } from "../middleware/authMiddleware";
import Docs from "../models/docs"
import { Request, Response, NextFunction } from 'express';

export const addDocs = async (req: CustomRequest, res: Response) => {
    try{
        const{title,attachments}=req.body
        const{userId}=req.user!;
       
       
       
        const docs =  await Docs.create({title,student:userId,attachments})
        res.status(200).json(docs);

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}

export const updateDocs = async (req: CustomRequest, res: Response) => {
    try{
        const { _id } = req.body;
        const dox = await Docs.findById(_id);

        if(dox){
            dox.title=req.body.title || dox.title,
           
            dox.attachments=req.body.attachments || dox.attachments

            const updatedDox = await dox.save();
         res.status(201).json({
            status: true,
            message: "Document Updated Successfully.",
            docs:  updatedDox,
          });
        } else {
          res.status(404).json({ status: false, message: "Academics not found" });
        }

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}

export const getDocs = async (req: CustomRequest, res: Response) => {
    const{userId,isAdmin}=req.user!;
  
    try {
      
        
      const docs = await Docs.find({student:userId}).populate({path:"student",select:"surname firstname wilaya"}).sort({ createdAt: -1 });
  
    
  
      res.status(200).json({ status: true, docs});
    } catch (error: any) {
      res.status(400).json({ status: false, message: error.message });
    }
  };
  export const getADocs = async (req:Request, res: Response) => {
    const{id}=req.query;
  
    try {
      
        
      const docs = await Docs.find({student:id}).populate({path:"student",select:"surname firstname wilaya"}).sort({ createdAt: -1 });
  
    
  
      res.status(200).json({ status: true, docs});
    } catch (error: any) {
      res.status(400).json({ status: false, message: error.message });
    }
  };


  export const deleteDocs = async (req: Request, res: Response) => {
    const { id } = req.query;
    try{
        await Docs.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
          });

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}