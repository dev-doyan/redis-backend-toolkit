import express from "express"
import proxy from "express-http-proxy"

const app= express()

const port =process.env.port

app.get("/",(req,res)=>{
    res.json({mssg:"backend"})
})

app.use('/auth',proxy("http://localhost:4001"));
app.use('/order',proxy("http://localhost:4002"));

app.listen("4000",()=>{
    console.log(`server running on 4000`)
})