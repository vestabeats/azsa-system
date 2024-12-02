import { Response,Request } from "express";
import { CustomRequest } from "../middleware/authMiddleware";
import Academics from "../models/academics";
import path from 'path';
import mime from "mime-types";
import axios from "axios";
import { Readable } from "stream";

export const addAcademics = async (req: CustomRequest, res: Response) => {
    try{
        const{program,level,university,attachments}=req.body
        const{userId}=req.user!;
       
       
        const academics =  await Academics.create({program,level,university,attachments,by:userId})
        res.status(200).json(academics);

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}

export const updateAcademics = async (req: CustomRequest, res: Response) => {
    try{
        const { _id } = req.body;
        const academ = await Academics.findById(_id);

        if(academ){
            academ.program=req.body.program || academ.program,
            academ.level =req.body.level || academ.level, 
            academ.university =req.body.university || academ.university,
            academ.attachments=req.body.attachments || academ.attachments

            const updatedAcadem = await academ.save();
         res.status(201).json({
            status: true,
            message: "Academics Updated Successfully.",
            academics:  updatedAcadem,
          });
        } else {
          res.status(404).json({ status: false, message: "Academics not found" });
        }

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}

export const deleteAcademics = async (req: Request, res: Response) => {
    const { id } = req.query;
    try{
        await Academics.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
          });

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}

export const getAData = async (req: CustomRequest, res: Response) => {
    
  
    try {
      
  
      const academics = await Academics.find({}).sort({ createdAt: -1 });
  
    
  
      res.status(200).json({ status: true, academics});
    } catch (error: any) {
      res.status(400).json({ status: false, message: error.message });
    }
  };

  export const getProgData = async (req: CustomRequest, res: Response) => {
    const{program}=req.params
  
    try {
      
  
      const programData = await Academics.find({program}).sort({ createdAt: -1 });
  
    
  
      res.status(200).json({ status: true, programData});
    } catch (error: any) {
      res.status(400).json({ status: false, message: error.message });
    }
  };

  export const downloadFile = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Fetch the item from your database
        const item = await Academics.findById(id);

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
        const fileName = fileUrl.split('/').pop() || "downloaded-file";
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