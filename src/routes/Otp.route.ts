import {Router} from "express"
import { verifyApiKey } from "../middlewares/verifyApiKey.js";
import { otpController } from "../controller/Otp.controller.js";

const router:Router=Router();
router.route("/sendOtp").post(verifyApiKey,otpController);

export default router;
