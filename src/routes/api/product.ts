import { Router, Request, Response } from 'express';
import Product , {TProduct , IProduct} from "../../model/Product" ; 
const router: Router = Router();
router.post("/",async (req: Request, res: Response) => {
    const { rules, basePrice } = req.body;
    const productFields : TProduct  = {
        rules , basePrice
    }
    let product = new Product(productFields);
    try{
        await product.save() ; 
        res.status(201).json(product); 
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error("Erreur inconnue :", err);
        }
        res.status(500).send("Server Error");
    }
});
router.get("/:productId", async (req : Request, res :any ) => {
    try {
        let product: IProduct | null = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ msg: "product not found" });
        }
        return res.status(200).json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
});

router.post("/:productId/calculate",async (req : Request, res :any ) => {
    try{
        let product: IProduct | null = await Product.findById(req.params.productId)
        if (!product){
             return res.status(404).json({ msg: "product not found" });
        }     
        let customerData :any
         customerData = {
            age: req.body.age ,
            income: req.body.income ,
            hasPreviousClaims : req.body.hasPreviousClaims
        };
        var quote = product.basePrice ;  
        for(var rule of product.rules){
            var conditionstring = "";
            for(var condition of rule.conditions) {
                if(condition?.type){
                    if(condition.type=="AND")
                        conditionstring=conditionstring+" && "
                    else
                        conditionstring=conditionstring+" || "
                }
                conditionstring = conditionstring+" "+customerData[condition.field]+" "+condition.operator+" "+condition.value
            }
            if(eval(conditionstring))
                quote= eval(quote+" "+rule.operation.operator+" "+rule.operation.value)
        }
        res.status(200).json({
            "finalQuote":quote
        }); 
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error("Erreur inconnue :", err);
        }
        res.status(500).send("Server Error");
    }
});
export default router;