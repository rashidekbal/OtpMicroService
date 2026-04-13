import otpModel from "../model/otp.model.js"
import connectDB from "../db/connection.js"

const removeExistingEmailData=async (email:string)=>{
   await connectDB();
   return otpModel.deleteMany({"email":email})
}
const addOtpRecord=async(email:string,otp:string,createdAt:number)=>{
    await connectDB();
    return otpModel.insertOne({
        email:email,
        otp:otp,
        createdAt:createdAt
    })
}
const getOtpRecord=async(email:string,timeStamp:number)=>{
    await connectDB();
    return otpModel.findOne({"email":email,"createdAt":{$gt:timeStamp}});
}
const deleteOtpRecord=(email:string)=>{
    return otpModel.deleteMany({"email":email});
}
export {
    removeExistingEmailData,
    addOtpRecord,
    getOtpRecord,
    deleteOtpRecord
}