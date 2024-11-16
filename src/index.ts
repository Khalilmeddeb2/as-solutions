import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import rateLimit from 'express-rate-limit';
import product from "./routes/api/product"
dotenv.config();
const app = express();
const port=process.env.PORT || process.env.port 
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
})
app.use(express.json())
app.use(limiter)
app.use("/products",product)
async function main() {
    try {
      await mongoose.connect(
        `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`
      );
      console.log("database connection successfully");
      app.listen(port, () => {
        console.log(`server listening on port ${port}`);
      });
    } catch (error) {
      console.log(`failed to connect database ${error}`);
    }
}
main();