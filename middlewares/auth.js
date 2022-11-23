const jwt = require('jsonwebtoken');
function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split('')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token,'Snippet_SecretKEY',(err,user)=>{
        console.log("jwt");
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
function generatedAccessToken(username){
    return jwt.sign({data:username},"Snippet_SecretKEY",{
        expiresIn:"1h"
    });
}
module.exports={
    authenticateToken,
    generatedAccessToken,
};