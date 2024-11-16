import { Document, model, Schema } from "mongoose";
export type TCondition = {
    field: string ;
    operator : '>' | '<' | '==' | '!=' ;
    value: number | string | boolean ;
    type?: 'AND' | 'OR'
}
export interface ICondition extends TCondition, Document {}
export const ConditionSchema: Schema = new Schema({
    field: {
        type: String,
        required: true
      },
      operator: {
        type: String,
        required: true,
      },
      value: {},
      type: {
        type: String,
      }
});
const Condition = model<ICondition>("Condition", ConditionSchema);
export default Condition;