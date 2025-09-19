//connecting a database 
import mongose from "mongoose";

const connectDB = async()=>{
    try{
        const conn = await mongose.connect(process.env.dbURL);
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;