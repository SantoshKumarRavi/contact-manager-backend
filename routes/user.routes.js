const userController = require("../../../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/user",userController.userProfile);
// router.get("/user",(req,res)=> res.status(200).json({message:"Authorized User!!"}));
// router.use("/user");
module.exports = router;