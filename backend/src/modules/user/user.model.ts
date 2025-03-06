import mongoose from "mongoose";
import { BaseSchema } from "../../utils/Schema";
import { IUser } from "./user";


const UserSchema = new BaseSchema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Add password field
});

export default mongoose.model<IUser>("Users", UserSchema);
