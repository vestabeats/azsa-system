import Transcript from "../models/transcript"
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from "../middleware/authMiddleware";

export const addTranscript = async (req: CustomRequest, res: Response) => {
    try{
        const{yearofstudy,semester1,semester2,finalmark,attachments,studyprogram}=req.body
        const{userId}=req.user!;
       
        const yearExist = await Transcript.findOne({yearofstudy})
        if(yearExist){
            
            return res.status(400).json({status:false, message:"yearofstudy already exists"})
        }
        const transcript =  await Transcript.create({yearofstudy,semester1,semester2,finalmark,studyprogram,attachments,by:userId})
        res.status(200).json(transcript);

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}

export const updateTranscript = async (req: CustomRequest, res: Response) => {
    try{
        const { _id } = req.body;
        const tscript = await Transcript.findById(_id);

        if(tscript){
            tscript.yearofstudy=req.body.yearofstudy || tscript.yearofstudy,
            tscript.semester1 =req.body.semester1 || tscript.semester1, 
            tscript.semester2 =req.body.semester2 || tscript.semester2,
            tscript.finalmark =req.body.finalmark || tscript.finalmark, 
            tscript.studyprogram =req.body.studyprogram || tscript.studyprogram, 
            tscript.attachments=req.body.attachments || tscript.attachments

            const updatedTscript = await tscript.save();
         res.status(201).json({
            status: true,
            message: "Transcript Updated Successfully.",
            transcript: updatedTscript,
          });
        } else {
          res.status(404).json({ status: false, message: "Transcript not found" });
        }

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}

export const deleteTranscript = async (req: Request, res: Response) => {
    const { id } = req.query;
    try{
        await Transcript.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
          });

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}

export const getTData = async (req: CustomRequest, res: Response) => {
    const{userId}=req.user!;
  
    try {
      
  
      const transcript = await Transcript.find({by:userId}).sort({ createdAt: -1 });
  
    
  
      res.status(200).json({ status: true, transcript });
    } catch (error: any) {
      res.status(400).json({ status: false, message: error.message });
    }
  };

  export const getPerformanceStats = async (req: CustomRequest, res: Response) => {
    const { userId } = req.user!;

    try {
        const transcripts = await Transcript.find({ by:userId }).sort({ createdAt: -1 });

        const stats = transcripts.map(transcript => ({
            yearofstudy: transcript.yearofstudy,
            finalmark: transcript.finalmark,
        }));

        res.status(200).json({ status: true, data: stats });
    } catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }
};

export const getAdminPerformanceStats = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const transcripts = await Transcript.find({ by:userId }).populate({path:"by",select:"surname firstname"}).sort({ createdAt: -1 });

        const stats = transcripts.map(transcript => ({
            yearofstudy: transcript.yearofstudy,
            finalmark: transcript.finalmark,
        }));

        res.status(200).json({ status: true, data: stats,transcript:transcripts });
    } catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }
};