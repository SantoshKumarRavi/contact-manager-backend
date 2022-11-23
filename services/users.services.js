const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const auth = require("../middlewares/auth");

async function login({ username,password},callback){
    const user = await User.findOne({username});

    if(user !=null){
        if(bcryptjs.compareSync(password,user.password)){
            const token = auth.generatedAccessToken(username);
            return callback(null,{...user.toJSON(),token})
        }
        else{
            return callback({
                message:"Invalid Username/Password"
            })
        }
    }
    else{
        return callback({
            message:"Invalid Username/Password"
        })

    }
}
async function register(res,params,callback){
    if(params.username === undefined){
        return callback({message: "Username Required"});
    }
    const user = new User(params);
    await user.save()
    .then((response)=>{
        return res.send(response);
        
    }).catch((error)=>{
        return callback(error);
    });

}
module.exports = {
    login,
    register,
};