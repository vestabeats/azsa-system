import { CustomRequest } from "../middleware/authMiddleware";
import Discipline from "../models/discipline"
import { Request, Response, NextFunction } from 'express';

export const addDiscipline = async (req:Request, res: Response) => {
    try{
        const{reasons}=req.body
        const{userId}=req.query;
       
       
       
        const disc =  await Discipline.create({reasons,student:userId})
        res.status(200).json(disc);

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}

export const getDiscipline = async (req:Request, res: Response) => {
    try{
   
        const{userId}=req.query;
       
       
       
        const disc =  await Discipline.find({student:userId})
        res.status(200).json(disc);

    }catch (error: any) {
        res.status(400).json({ status: false, message: error.message });
    }

}