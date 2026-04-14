import express from  "express"
import { isValidEmail } from "../utils/Regex.js";
import ApiResponse from "../constants/ApiResponse.js";
import sendOtp from "../services/email.service.js"
import { generateOtp6digit } from "../utils/OtpGenerator.js";
import { addOtpRecord } from "../repo/opt-collection-operations-handler.js";
import { hashOtp } from "../utils/bcrypt-util.js";
import { getCurrentTime } from "../utils/date-util.js";
export const otpController=async(req:express.Request,res:express.Response)=>{
     try {
    const {email,company}=req.body;
    if(!isValidEmail(email)||!company)return res.status(400).json(new ApiResponse(400,"please check if the email is valid or company name is valid"));
        const otp=generateOtp6digit();
        const optHash=await hashOtp(otp);
        const currentTimeSecond=getCurrentTime();
        await sendOtp(email,company,otp);
        await addOtpRecord(email,optHash,currentTimeSecond);
       
        res.status(200).json(new ApiResponse(200,"success"));
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiResponse(500,"Oops something went wrong..."))
        
    }

}
