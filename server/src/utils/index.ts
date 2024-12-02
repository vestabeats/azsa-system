import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Response } from "express";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("database connection established");
    } catch (error) {
        console.error("error from database", error);
    }
};

export default dbConnection;

export const createJWT = (res: Response, userId: any): void => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite:"strict" ,// csrf attacks
        maxAge: 1*24*60*60*1000
    })

}
