import mongoose, { Schema, Document, Model } from "mongoose";

interface IDocs extends Document {
    title: string;
    student?: mongoose.Types.ObjectId;
    attachments?: string[];
}

const docsSchema: Schema<IDocs> = new Schema(
    
    {
        title:{ type: String, required: true },
        student: { type: Schema.Types.ObjectId, ref: "User", required: false },
        attachments: { type: [String], required: false },
    },
    { timestamps: true }
);

const Docs: Model<IDocs> = mongoose.model<IDocs>("Docs", docsSchema);
export default Docs;
