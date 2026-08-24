import express from "express"
const app=express();
import dotenv from "dotenv"
dotenv.config()
 const port=process.env.PORT


 app.get('/',(req,res)=>{
    console.log("hello");
 })

app.listen(port,()=>{
    console.log(`server running on ${port} `);
})