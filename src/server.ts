import "dotenv/config";
import app from "./app.js";
const port:string|undefined|number=process.env.PORT||8000;
app.listen(port,(err):void=>{
    if(err){
        console.log("error starting server : "+err);
        return ;
    }
        console.log(`server running at port ${port}`);
    
})
