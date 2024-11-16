import { Document, model, Schema } from "mongoose";
import { ICondition , ConditionSchema } from "./Condition" ;
import { IOperation , OperationSchema } from "./Operation"
export type TRule = {
    conditions: ICondition[] ;
    operation: IOperation ; 
}
export interface IRule extends TRule, Document {}
export const RuleSchema : Schema = new Schema({
    conditions: [ConditionSchema],
    operation: OperationSchema
});
const Rule = model<IRule>("Rule", RuleSchema);
export default Rule;