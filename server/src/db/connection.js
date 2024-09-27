import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("connected successfully");
        
    } catch (error) {
        console.log("MONGOD CONNECTION ERROR",error);
        process.exit(1)
    }
}

export default connectDB