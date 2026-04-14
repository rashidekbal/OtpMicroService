import express, { NextFunction } from "express";
import ApiResponse from "../constants/ApiResponse.js";
import { getApiKeyDetails } from "../repo/api-key-operations-handler.js";
export const verifyApiKey = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const apiKey = req.query.apiKey;
    if (!apiKey) return res.status(403).json(new ApiResponse(403, "please provide a api key"));
    const db_result = await getApiKeyDetails(apiKey as string);
    if (!db_result) return res.status(403).json(new ApiResponse(403, "please provide a valid api key"));
    if (!ValidApiKey(db_result)) return res.status(403).json(new ApiResponse(403, "api key suspended"));
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500,"something went wrong ...."));
  }
};
function ValidApiKey(db_result: any) {
  return db_result.active;
}
