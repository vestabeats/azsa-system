import bcrypt from "bcryptjs";
import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    surname: string;
    firstname: string;
    dob?: Date;
    startdate?: Date;
    wilaya?: string;
    university?: string;
    sex?: string;
    enddate?: Date;
    phonenumber?: string;
    year?: string;
    email?: string;
    mother?: string;
    father?: string;
    speciality?: string;
    parentnumber?:string;
    homeadress?:string,
    degreetype?:string,
    passportnumber?:string,
    password: any;
    passportphoto?:[string],
    program?:string,
    bankaccount?: string,
    isCreator: boolean;
    isAdmin: boolean;
    isOfficials: boolean;
    isActive: boolean;
    isTrashed: boolean;
    conduct: boolean;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
    {  
        surname: { type: String, required: true },
        firstname: { type: String, required: true },
        dob: { type: Date, default: new Date() },
        startdate: { type: Date, default: new Date() },
        wilaya: { type: String},
        university: { type: String},
        sex: { type: String},
        enddate: { type: Date, default: new Date() },
        parentnumber: { type: String },
        phonenumber: { type: String },
        speciality: { type: String },
        year: { type: String },
        email: { type: String,unique:true},
        mother: { type: String },
        father: { type: String },
        degreetype:{type: String},
        passportphoto:[String],
        homeadress: { type: String },
        bankaccount: { type: String },
        program: { type: String },
        passportnumber: { type: String,unique:true},
        password: { type: String, required: true },
        isCreator: { type: Boolean, required: true, default: false },
        isAdmin: { type: Boolean, required: true, default: false },
        isOfficials: { type: Boolean, required: true, default: false },
        isActive: { type: Boolean, required: true, default: true },
        isTrashed: { type: Boolean, default: false },
        conduct: { type: Boolean, default: true }
    },
    { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
