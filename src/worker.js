import { Queue,Worker } from "bullmq";
import Redis from "ioredis";
import sendemail from "./sendemail.js";
import emailqueue from "./queue.js";

const connection =new Redis(process.env.REDIS_URL,{
    maxRetriesPerRequest:null        //making connection
})


const worker= new Worker("emailqueue",async (job)=>{
    console.log("ujob started");
    const email=job.data.email;
    await sendemail(email);
    console.log("job finished ")
},{connection})

export default worker;