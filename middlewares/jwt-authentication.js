const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "fdnbgkd656d5g6dfgmnbdfjfg";
const Credential = require("../models/usermodels");
var userAuthentication = async (req,res,next)=>{
        const {authorization} = req.headers;
        
        if(!authorization){
            console.log("Sorry You are not logged in")
            return res.json({
                status:"authorization failed",
                message:"Looks like you are not logged in, Kindly register or signup first"
            })
        }
        
        console.log(authorization);
        // if(authorization && authorization.startsWith("Basic")){
        //     let token = authorization.split(" ")[1].trim();
        //     console.log("token=", token);
        //     try {
        //     const {userId} = jwt.verify(token,JWT_SECRET_KEY);
        //     req.user = await Credential.findById(userId);
        //     next();
        // } catch (error) {
        //         res.status(401).json({
        //             status:"Failed",
        //             message:"unauthorized user"
        //         })
        //     }
        // }
        // const verifyToken = (req,res,next) => {
            // const authHeader = req.headers.token;
            if (authorization){
                const token = authorization.split(' ')[1];
                const {userId} = jwt.verify(token,JWT_SECRET_KEY, async(err,user) => {
                    
                    if (err) res.status(403).json("token is not valid")
                    // req.user = user;
                    next();
                    
                })
                req.user = await Credential.findById(userId);
                console.log(userId);
            }else{
                return res.status(401).json("You are not authenticated")
            }
        // }
        // else{
        //     res.status(401).json({
        //         status:"Failed",
        //         message:"Kindly login"
        //     })
        // }
}
module.exports = userAuthentication;