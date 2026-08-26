import express, { json } from "express"
import dbconnection from "./db.js"
import User from "./model.js"
import Redis from "ioredis"
import ratelimitter from "./middlewear/ratelimitter.js"
const app=express();
import dotenv from "dotenv"
dotenv.config()
 const port=process.env.PORT


 app.use(express.json());

 export const redis = new Redis(process.env.REDIS_URL);

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

 app.get("/get",ratelimitter,async(req,res)=>{
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
 



 //otp generation and storage in redis 
 app.post("/send-otp",async(req,res)=>{
    const {email}=req.body;
    const otp =  Math.floor(1000 + Math.random() * 9000);
    await redis.set(`otp:${email}`,otp.toString(),'EX',50);

    return res.json({otp})
 })
app.post("/verify-otp",async(req,res)=>{
      const { email, otp } = req.body;
      const cachedotp=await redis.get(`otp:${email}`);
      if(!cachedotp){
        return res.json({mssg:"either otp not found or expired"})
      }

      if(cachedotp != otp) {
        return res.status(400).json({ "message": "incorrect otp" })
    }
     await redis.del(`otp:${email}`);
    return res.json({mssg:"verified "})

})
 

app.listen(port,()=>{
    console.log(`server running on ${port} `);
    dbconnection();
})