import mongoose, { Schema, Document, Model } from "mongoose";

interface IAcademics extends Document {
    program: string;
    university: string;
    level: string;
    by?: mongoose.Types.ObjectId;
    attachments?: string[];
}

const academicsSchema: Schema<IAcademics> = new Schema(
    
    {
        program:{ type: String, required: true },
        university:{ type: String, required: true },
        level:{ type: String, required: true },
        by: { type: Schema.Types.ObjectId, ref: "User", required: false },
        attachments: { type: [String], required: false },
    },
    { timestamps: true }
);

const Academics: Model<IAcademics> = mongoose.model<IAcademics>("Academics", academicsSchema);
export default Academics;
