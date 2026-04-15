import  Express, { NextFunction }  from "express"
import { isValidEmail } from "../utils/Regex.js";
import apiKeyModel from "../model/api-key-model.js";
import { deleteAPiKey } from "../repo/api-key-operations-handler.js";
import ApiResponse from "../constants/ApiResponse.js";
const deleteOldApiKeyForEmail=async(req:Express.Request,res:Express.Response,next:NextFunction)=>{
    try {
        const email=req.body.email;
        await deleteAPiKey(email);
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500,"something went wrong.."))
        
    }
}
export {deleteOldApiKeyForEmail}