import express from  "express"
import { isValidEmail } from "../utils/Regex.js";
import ApiResponse from "../constants/ApiResponse.js";
import sendOtp from "../services/email.service.js"
import { generateOtp6digit } from "../utils/OtpGenerator.js";
export const otpController=async(req:express.Request,res:express.Response)=>{
     try {
    const {email,company}=req.body;
    console.log(isValidEmail(email))
    if(!isValidEmail(email)||!company)return res.status(400).json(new ApiResponse(400,"please check if the email is valid or company name is valid"));
        const otp=generateOtp6digit();
        let result=await sendOtp(email,company,otp);
        res.status(200).json(new ApiResponse(200,otp));

    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiResponse(500,"Oops something went wrong..."))
        
    }

}