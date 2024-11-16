import { Document, model, Schema } from "mongoose";
import { IRule, RuleSchema } from "./Rule";
export type TProduct = {
    rules: IRule[];
    basePrice: number;
};

export interface IProduct extends TProduct, Document {}

const productSchema: Schema = new Schema({
    rules: [RuleSchema],
    basePrice: {
        type: Number,
    }
}); // Par défaut, Mongoose inclura automatiquement un champ _id

const Product = model<IProduct>("Product", productSchema);

export default Product;
