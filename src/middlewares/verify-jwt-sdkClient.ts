import Express, { NextFunction } from "express";
import ApiResponse from "../constants/ApiResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config"


function verifyOtpSignedToken(req:Express.Request, res:Express.Response, next:NextFunction) {
  let header = req.headers["authorization"];
  if (!header) return res.status(401).json(new ApiResponse(401,"please provide a valid auth header"));
  let token = header.split(" ")[1];
  if (token ==null) return res.status(401).json(new ApiResponse(401,"please privde a valid auth token"));
  jwt.verify(token, process.env.JWT_SECRET as string, (err, result:any) => {
    if(err)return res.status(401).json(new ApiResponse(401,"invalid or expired jwt"))
    req.body.email=result.email
    next();
  })
   
  
}
export default verifyOtpSignedToken