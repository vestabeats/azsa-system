import mongoose, { Schema, Document, Model } from "mongoose";

interface ITranscript extends Document {
    studyprogram: string;
    yearofstudy: string;
    by: mongoose.Types.ObjectId;
    semester1: string;
    semester2: string;
    finalmark: string;
    
    attachments?: string[];
}

const transcriptSchema: Schema<ITranscript> = new Schema(
    
    {
        studyprogram:{ type: String, required: true },
        yearofstudy: { type: String, required: true },
        by: { type: Schema.Types.ObjectId, ref: "User", required: true },
        semester1: { type: String, required: true },
        semester2: { type: String, required: true },
        finalmark: { type: String, required: true },
        attachments: { type: [String], required: false },
    },
    { timestamps: true }
);

const Transcript: Model<ITranscript> = mongoose.model<ITranscript>("Transcript", transcriptSchema);
export default Transcript;
