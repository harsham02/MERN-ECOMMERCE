import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://harshavardhan15015:harshavardhan15015@cluster0.gojgq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("db connected");
 }catch (error){
      console.log(`error: ${error.message}`);
      process.exit();
 }
}

export default connectDB;