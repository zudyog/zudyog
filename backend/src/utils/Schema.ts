import { Schema } from "mongoose";

export class BaseSchema<T> extends Schema<T> {
    constructor(schema: any) {
        super(schema);
        this.set('toJSON', {
            getters: true,
            virtuals: true,
            transform: (doc, converted) => {
                delete converted._id;
            }
        });
    }

}
