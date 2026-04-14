import Express, { NextFunction } from "express"

import ApiResponse from "../constants/ApiResponse.js";
import { removeExistingEmailData } from "../repo/opt-collection-operations-handler.js";


export default async function(req:Express.Request,res:Express.Response,next:NextFunction){
    try {
        const email=req.body.email;
        if(!email)return res.status(400).json(new ApiResponse(400,"please provide a valid email"));
        await removeExistingEmailData(email)
       return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500,"something went wrong"));  
    }
}