import {Router} from "express"
import { generateApiKeyController, requestClientOtpController, verifyOtpSdkClientController } from "../controller/sdk-client-controller.js";
import oldRecordInvalidatorMiddleware from "../middlewares/old-record-invalidator-middleware.js";
import verifyOtpSignedToken from "../middlewares/verify-jwt-sdkClient.js";
import { deleteOldApiKeyForEmail } from "../middlewares/old-api-key-cleaner-middleware.js";
const router=Router();
router.route("/getOtp").post(oldRecordInvalidatorMiddleware,requestClientOtpController);
router.route("/verifyOtp").post(verifyOtpSdkClientController);
router.route("/getApiKey").post(verifyOtpSignedToken,deleteOldApiKeyForEmail,generateApiKeyController)
export default router;