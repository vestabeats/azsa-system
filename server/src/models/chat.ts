import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IChat extends Document {
  members: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema corresponding to the document interface.
const ChatSchema: Schema<IChat> = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
  }
);

// Create and export the model based on the schema and interface.
const Chat: Model<IChat> = mongoose.model<IChat>("Chat", ChatSchema);
export default Chat;
