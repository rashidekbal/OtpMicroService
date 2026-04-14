import connectDB from "../db/connection.js";
import apiKeyModel from "../model/api-key-model.js";
const getApiKeyDetails=async(apikey:string)=>{
    await connectDB()
    return apiKeyModel.findOne({"apiKey":apikey})
}
export {
    getApiKeyDetails
}