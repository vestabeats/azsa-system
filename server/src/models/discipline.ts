import mongoose, { Schema, Document, Model } from "mongoose";

interface IDiscipline extends Document {
    reasons: string;
    student?: mongoose.Types.ObjectId;
   
}

const disciplineSchema: Schema<IDiscipline> = new Schema(
    
    {
        reasons:{ type: String, required: true },
        student: { type: Schema.Types.ObjectId, ref: "User", required: false },
       
    },
    { timestamps: true }
);

const Discipline: Model<IDiscipline> = mongoose.model<IDiscipline>("Discipline", disciplineSchema);
export default Discipline;
