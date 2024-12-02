import mongoose, { Schema, Document, Model } from "mongoose";

interface INotification extends Document {
    text: string;
    student?: mongoose.Types.ObjectId;
    isRead?: mongoose.Types.ObjectId;
    notiType:string;
    attestation?: mongoose.Types.ObjectId;
}

const notificationSchema: Schema<INotification> = new Schema(
    
    {
        text:{ type: String, required: true },
        student: { type: Schema.Types.ObjectId, ref: "User", required: false },
        isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
        notiType: { type: String, default: "alert", enum: ["alert", "message"] },
        attestation: { type: Schema.Types.ObjectId, ref: "Attestation" },
    },
    { timestamps: true }
);

const Notification: Model<INotification> = mongoose.model<INotification>("Notification", notificationSchema);
export default Notification;
