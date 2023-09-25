const express = require("express");
const router = express.Router();
const user = require("../db/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookies = require("cookie-parser");

//middleware for cookies
router.use(cookies());

// register user route
router.post("/register",async (req,res)=>{
    console.log(req.body);
    const {username,email,password} = req.body;
    if(!username || !email || !password){
       return res.send({msg:"please enter all the details"});
    }

    try {
      //hash password
    const hashedPassword = await bcrypt.hash(password,10);

    //check if user is already registered
    const registeredUser = await user.findOne({
        username:username,
        email:email,
    });
    if(registeredUser){
        const check = await bcrypt.compare(password,registeredUser.password);
        //comparing the password
        if(check){
            return res.send({msg:"user already registered"});
        }
    }

    // if not registered then create
    //create user
    const createdUser = await user.create({
        username:username,
        email:email,
        password:hashedPassword
    });

    //create jwt token
    const access_token = jwt.sign({username,email,password},process.env.JWT_SECRET_KEY,{expiresIn:"3d"});

    res.cookie("access-cookie",access_token,{maxAge:1000*60*60*24*3});
    res.json({token:access_token,createdUser});
    } catch (error) {
        res.status(400).send(error);
    }

   
});

router.post("/login",async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.send({msg:"please enter all the details"});
    }

    try {

    //check if user is already registered
    const registeredUser = await user.findOne({
        username:username,
        email:email,
    });
    if(registeredUser){
        const check = await bcrypt.compare(password,registeredUser.password);
        //comparing the password
        if(check){
            //create jwt
            const access_token = jwt.sign({username,email,password},process.env.JWT_SECRET_KEY,{expiresIn:"15m"});
            res.cookie("access-cookie",access_token,{maxAge:2 * 60 * 60 * 1000 , httpOnly:true}); 
            res.json({token:access_token,registeredUser}); 
        }else{
            res.send({msg:"please enter valid credentials"});
        }
    }else{
         // if not found the user is not registered
     return res.send({msg:"user not registered"});
    }




  }catch(error){
    res.send({msg:error});
  }

});

module.exports = router;