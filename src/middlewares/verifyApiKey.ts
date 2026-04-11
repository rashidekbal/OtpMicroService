import express, { NextFunction } from "express"
import ApiResponse from "../constants/ApiResponse.js";
import { ParsedUrlQuery } from "node:querystring";
export const verifyApiKey=async(req:express.Request,res:express.Response,next:NextFunction)=>{
    const apiKey=req.query.apiKey;
    if(!apiKey)return res.status(401).json(new ApiResponse(401,"please provide a api key"));
    if(!ValidApiKey(apiKey))return res.status(401).json(new ApiResponse(401,"please provide a valid and active api Key"));
    return next();

}
function ValidApiKey(ApiKey:any){
    return ApiKey==process.env.API_KEY;
}