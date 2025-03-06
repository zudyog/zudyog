import { Schema, model } from "mongoose";
import { Sector } from "./sector";
import { BaseSchema } from "../../utils/Schema";

const SectorsSchema = new BaseSchema<Sector>({
    name: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
});

export const SectorModel = model<Sector>('Sectors', SectorsSchema);