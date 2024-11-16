import { Document, model, Schema } from "mongoose";
export type TOperation = {
    field : string ;
    operator : '+' | '-' | '*' | '/' ;
    value: number ;
}
export interface IOperation extends TOperation, Document {}
export const OperationSchema: Schema = new Schema({
    field: {
        type: String,
        required: true
      },
      operator: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
      }
});
const Operation = model<IOperation>("Operation", OperationSchema);
export default Operation;