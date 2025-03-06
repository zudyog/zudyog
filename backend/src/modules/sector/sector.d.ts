import mongoose from "mongoose";

export interface Sector extends mongoose.Document {
    name: string;
}