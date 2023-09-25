const jwt = require("jsonwebtoken");
const userModel = require("../db/userModel.js");
const bcrypt = require("bcrypt");


const verify = async (req,res,next)=>{
    try {
        const accessToken = req.cookies["access-cookie"];
     if(!accessToken){
        return res.status(400).send("user not authorised");
    }
    const validUser = jwt.verify(accessToken,"mostimportantsecretforauth");
        if(validUser){
            const hashedPassword = await bcrypt.hash(validUser.password,10);
            const check = await bcrypt.compare(validUser.password,hashedPassword);

            if(check){
            const user = await userModel.findOne({
            username:validUser.username,
            email:validUser.email,
        });
        req.user = user;
        req.token = accessToken;
        req.authenticated = true;
        return next();
    }
} 
  }  catch (error) {
        console.log(error);
    }
    

}


module.exports = verify;