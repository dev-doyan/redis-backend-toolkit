import mongoose from "mongoose"

const dbconnection=async()=>{
    await mongoose.connect()
}