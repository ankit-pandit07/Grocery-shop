import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected");
    } catch (error) {
        console.log("Error connecting to MognoDB:",error);
        process.exit(1);
    }
}