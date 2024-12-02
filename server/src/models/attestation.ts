import mongoose, { Schema, Document, Model } from "mongoose";

interface IAttestation extends Document {
    title: string;
    student?: mongoose.Types.ObjectId;
    attachments?: string[];
    requested?:Boolean;
}

const attestationSchema: Schema<IAttestation> = new Schema(
    
    {
        title:{ type: String, required: true },
        student: { type: Schema.Types.ObjectId, ref: "User", required: false },
        attachments: { type: [String], required: false },
        requested:{type:Boolean, required: false,default:false},
    },
    { timestamps: true }
);

const Attestation: Model<IAttestation> = mongoose.model<IAttestation>("Attestation", attestationSchema);
export default Attestation;
