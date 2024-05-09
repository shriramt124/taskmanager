const jwt = require("jsonwebtoken")

const isAuthenticated = async(req,res,next)=>{
    const token = req.cookies.token;
    console.log(token)
    try {
       if(!token){
       return res.status(401).json({
        success:false,
        message:"token not found"
       })
        
       }
       const decoded =  jwt.verify(token,process.env.JWT_SECRET);
       console.log(decoded);
       req.user = decoded;
       console.log("it is runnig")
        next();
    } catch (error) {
        
        next(new Error("error in authentication"));
    }
}

module.exports = isAuthenticated;