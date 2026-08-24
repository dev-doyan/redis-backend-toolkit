import mongoose from "mongoose"

const dbconnection=async()=>{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("databse connected")
}

export default dbconnection;