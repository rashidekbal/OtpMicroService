import express from "express"
import cors from "cors";
import optRouter from "./routes/Otp.route.js"
import sdkClientRouter from "./routes/sdk-client-route.js"
const app =express();
app.use(express.json({limit:"16kb"}));
app.use(cors({origin:"*"}));
app.get("/",(req,res)=>{
    res.send("<h1>site up and running</h1>");
})
app.use("/api/v1/otp",optRouter);
app.use("/api/v1/sdkClient",sdkClientRouter)

export default app;