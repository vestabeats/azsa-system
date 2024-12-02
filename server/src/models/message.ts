import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IMessage extends Document {
  chatId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  isRead?: mongoose.Types.ObjectId;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema corresponding to the document interface.
const MessageSchema: Schema<IMessage> = new Schema(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model based on the schema and interface.
const Message: Model<IMessage> = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
