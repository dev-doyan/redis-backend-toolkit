import express, { json } from "express"
import dbconnection from "./db.js"
import User from "./model.js"
import Redis from "ioredis"
const app=express();
import dotenv from "dotenv"
dotenv.config()
 const port=process.env.PORT


 app.use(express.json());

 const redis = new Redis(process.env.REDIS_URL);

 //creating user

 app.post("/add",async(req,res)=>{
try {
    const {name,email,password}=req.body;
const user = await User.create({
    name,
    email,
    password,
});
res.json({mssg:"added successfully",user})
} catch (error) {
    res.json({mssg:error.message

    })
}
 })


 //get

 app.get("/get",async(req,res)=>{
    try {
        const user = await User.find();            //without redis =67ms
        res.json({user})
    } catch (error) {
        res.json({mssg:error.message});
    }
 })



 //with redis

 app.get("/get-with-redis",async(req,res)=>{
    try {
        const cached= await redis.get("key"); //u can pass any key value
    if(cached){
        const users=JSON.parse(cached);
        return res.json({users});
    }

    const user=await User.find();
    await redis.set("key",JSON.stringify(user));

    res.json({user})
    } catch (error) {
        res.json({mssg:error.message});     //with redis=5/6 ms
    }

 })
 

 

app.listen(port,()=>{
    console.log(`server running on ${port} `);
    dbconnection();
})