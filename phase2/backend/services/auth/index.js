import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app= express()

const port =process.env.port

app.get("/",(req,res)=>{
    res.json({mssg:"auth"})
})

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})