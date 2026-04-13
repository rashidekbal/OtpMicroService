import Express from "express"
import ApiResponse from "../constants/ApiResponse.js";
import {  deleteOtpRecord, getOtpRecord } from "../repo/opt-collection-operations-handler.js";
import { getCurrentTime } from "../utils/date-util.js";
import { verifyHash } from "../utils/bcrypt-util.js";

const verifyOtpController=async(req:Express.Request,res:Express.Response)=>{
    try {
        const {email,otp}=req.body;
        if(!email||!otp)return res.status(400).json(new ApiResponse(400,"please provide valid email and otp"));
        const db_record=await getOtpRecord(email,(getCurrentTime()-(1000*60*5)));
        if(!db_record)return res.status(401).json(new ApiResponse(401,false));
        const isValidOtp=await verifyHash(db_record.otp,String(otp));
        if(!isValidOtp)return res.status(401).json(new ApiResponse(401,false))
        await deleteOtpRecord(email)
        return res.status(200).json(new ApiResponse(200,true));  
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500,"something went wrong"));
        
    }
}
export {verifyOtpController}