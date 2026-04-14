import mongoose from "mongoose";
export interface apiKeyObject{
    email:string,
    organization:string,
    apiKey:string,
    createdAt:number,
    active:boolean
}

const apiKeySchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  organization:{
    type:String,
    require:true
  },
  apiKey:{
    type:String,
    require:true,
    unique:true
  },
  createdAt:{
    type:Number,
    require:true
  },
  active:{
    type:Boolean,
    require:true,
    default:true
  }

});

export default mongoose.models.apiKeyModel||mongoose.model("apiKeyModel",apiKeySchema);
