import express from "express"
import cors from "cors";
import optRouter from "./routes/Otp.route.js"
const app =express();
app.use(express.json({limit:"16kb"}));
app.use(cors({origin:"*"}));
app.get("/",(req,res)=>{
    res.send("<h1>welcome to the page</h1>");
})
app.use("/api/v1/otp",optRouter);

export default app;