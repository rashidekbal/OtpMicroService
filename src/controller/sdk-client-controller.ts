import Express  from "express";
import { isValidEmail } from "../utils/Regex.js";
import ApiResponse from "../constants/ApiResponse.js";
import sendEmailOtp, { sendApiKey } from "../services/email.service.js";
import { generateOtp6digit } from "../utils/OtpGenerator.js";
import { hashOtp, verifyHash } from "../utils/bcrypt-util.js";
import { addOtpRecord, deleteOtpRecord, getOtpRecord } from "../repo/opt-collection-operations-handler.js";
import { getCurrentTime } from "../utils/date-util.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { v4 as uuid } from "uuid";
import { addNewApiKey } from "../repo/api-key-operations-handler.js";
import { apiKeyObject } from "../model/api-key-model.js";

const requestClientOtpController=async(req:Express.Request,res:Express.Response)=>{
    try {
        const email=req.body.email;
        if(!isValidEmail(email))return res.status(400).json(new ApiResponse(400,"please provide a valid email"));
        const otp=generateOtp6digit();
        const hashedOtp=await hashOtp(otp);
       await  sendEmailOtp(email,"EAZY_OTP",otp);
       await addOtpRecord(email,hashedOtp,getCurrentTime());
       return res.status(200).json(new ApiResponse(200,"success"));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500,"something went wrong..."));
        
    }

}
const verifyOtpSdkClientController=async(req:Express.Request,res:Express.Response)=>{
try {
        const {email,otp}=req.body;
        if(!email||!otp)return res.status(400).json(new ApiResponse(400,"please provide valid email and otp"));
        const db_record=await getOtpRecord(email,(getCurrentTime()-(1000*60*5)));
        if(!db_record)return res.status(401).json(new ApiResponse(401,"invalid otp"));
        const isValidOtp=await verifyHash(db_record.otp,String(otp));
        if(!isValidOtp)return res.status(401).json(new ApiResponse(401,"invalid otp"))
        await deleteOtpRecord(email);
        const JWT_SECRET=process.env.JWT_SECRET as string;
        const token=jwt.sign({email},JWT_SECRET,{expiresIn:"5m"});
        return res.status(200).json(new ApiResponse(200,{token:token}));  
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500,"something went wrong"));
        
    }    

}

const generateApiKeyController=async(req:Express.Request,res:Express.Response)=>{
    try {
        const {organization,email}=req.body;
        if(!organization)return res.status(400).json(new ApiResponse(400,"please enter a valid organization info"));
        const apiKey=uuid();
        const currentTimeSecond=getCurrentTime();
        const apiKeyData:Omit<apiKeyObject,"_id">={
            email,
            organization,
            apiKey,
            createdAt:currentTimeSecond,
            active:true
        }
        await addNewApiKey(apiKeyData)
        let result=await sendApiKey(email,organization,apiKey);
        console.log(result)
        return res.status(200).json(new ApiResponse(200,"success"));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500,"something went wrong ...."))
        
    }

}
export{requestClientOtpController,verifyOtpSdkClientController,generateApiKeyController}