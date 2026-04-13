import mongoose, { mongo } from "mongoose";
export interface otpCollection{
    email:string,
    otp:String,
    createdAt:number
}

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true,
    }
    ,
    createdAt:{
        type:Number,
        require:true
    }
});

export default mongoose.models.otpCollection||mongoose.model("optCollection",otpSchema)