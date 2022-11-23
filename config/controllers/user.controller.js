const bcryptjs = require('bcryptjs');
const userService = require('../services/users.services');

exports.register=(req,res,next)=>{
    const {password} = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password=bcryptjs.hashSync(password,salt);

    userService.register(res,req.body,(error,result)=>{
        if(error){
            console.log(error);
            return next(error);
        }
        return res.status(200).send({
            message:"Success",
            data : result,
    });
    });
};
exports.login = (req,res,next) => {
    const {username , password} = req.body;

    userService.login({username, password},(error,result)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message:"Success",
            data:result,
    });

    });
}
exports.userProfile = (res,req,next) =>{
    console.log("inside function");
    return res.status(200).json({message:"Authorized User!!"});
    


};
