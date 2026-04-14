import {Router} from "express"
import { verifyApiKey } from "../middlewares/verifyApiKey.js";
import { otpController } from "../controller/Otp.controller.js";
import oldRecordInvalidatorMiddleware from "../middlewares/old-record-invalidator-middleware.js";
import { verifyOtpController } from "../controller/VerifyController.js";

const router:Router=Router();
router.route("/sendOtp").post(verifyApiKey,oldRecordInvalidatorMiddleware,otpController);
router.route("/verify").post(verifyApiKey,verifyOtpController);
export default router;
