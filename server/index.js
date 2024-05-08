const dotenv = require("dotenv")
const express = require("express")
 const dbConnect = require("./utils/dbConnect")
const app = express()
dotenv.config();

 

app.get("/",(req,res)=>{
    res.send("hello from server")
})
 

const port  = process.env.PORT || 2000
app.listen(port,async ()=>{
   try {
    await dbConnect();
    console.log('server is runnig on port ',port);
   } catch (error) {
    
   }
})