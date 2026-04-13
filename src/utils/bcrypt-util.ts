import bcrypt from "bcrypt"
import { BCRYPT_SALT_ROUNDS } from "../constants/CONSTANT-VALUES.js"

const hashOtp=(otp:number)=>{
    return bcrypt.hash(String(otp),BCRYPT_SALT_ROUNDS);
}
const verifyHash=(hashedValue:string,rawvalue:string)=>{
    return bcrypt.compare(rawvalue,hashedValue);
}
export {
    hashOtp,
    verifyHash
}