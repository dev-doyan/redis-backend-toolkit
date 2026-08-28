import { Queue } from "bullmq";
import Redis from "ioredis";

const connection =new Redis(process.env.REDIS_URL,{
    maxRetriesPerRequest:null        //making connection
})

const  emailqueue =new Queue("emailqueue",{connection})   //a name and copnnection have to be passed 

export default emailqueue;
