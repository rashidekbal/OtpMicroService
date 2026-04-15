import connectDB from "../db/connection.js";
import apiKeyModel, { apiKeyObject } from "../model/api-key-model.js";
const getApiKeyDetails=async(apikey:string)=>{
    await connectDB()
    return apiKeyModel.findOne({"apiKey":apikey})
}
const addNewApiKey=async(data:Omit<apiKeyObject,"_id">)=>{
    await connectDB();
    return apiKeyModel.insertOne({
        email:data.email,
        organization:data.organization,
        apiKey:data.apiKey,
        createdAt:data.createdAt,
        active:data.active

    })

}
const deleteAPiKey=async(email:string)=>{
    await connectDB();
    return apiKeyModel.deleteMany({"email":email});

}
export {
    getApiKeyDetails,deleteAPiKey,addNewApiKey
}