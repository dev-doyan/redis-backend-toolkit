import {redis} from "../index.js"

export const ratelimitter=async(req,res,next)=>{
    const ip=req.ip //gives the ip address
    const key = `ratelimit:${ip}`;
    const requests=await redis.incr(key);
    if(requests==1){
        await redis.expire(key,60);
    }

    if(requests>5){
        return res.status(429).json({mssg:"too many req"});
    }
    next()
}

export default ratelimitter;