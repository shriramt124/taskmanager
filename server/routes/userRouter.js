const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/sign-up", async (req, res) => {
    //take the username
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields must be provided"
            })
        }
        //check if user is already registered
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user exist please login"
            })
        }
        //check if username length is less than 3
        if (username.length <= 3) {
            res.status(400).json({
                success: false,
                message: "username should have atleast 4 characters"
            })
        }
        //hash the passwrod
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save()
        res.status(200).json({
            success: true,
            message: "user registered successfully",
            data: user
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:"internal server error"
        })
    }
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        if(!email || !password){
            res.status(401).json({
                success:false,
                message:"all fields are required"
            })
        }
        const existingUser  = await User.findOne({email});
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"user does not exist please signup"
            })
        }
        const isValidPassword = await bcrypt.compare(password,existingUser.password);
        if(!isValidPassword){
            res.status(401).json({
                success:false,
                message:"invalid credentials"
            })
        }

        const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        //set res header to token

        console.log("calling from login",token);
        
        res.status(200).json({
            success:true,
            messaage:"user logged in successfully",
            id:existingUser._id,
            token
        })

    } catch (error) { 
        return res.json(500).json({
            success:false,
            message:error.message,
            stack:error.stack
        })
    }
})


 

module.exports = router;