const express = require("express");
const router = express.Router();
const recipeModel = require("../db/recipeModel.js");
const userModel = require("../db/userModel.js");
const multer = require("multer");
const path = require("path");




//get all recipes
router.get("/",async (req,res)=>{
    try {
    const recipes = await recipeModel.find({});
    res.json(recipes);    
    } catch (error) {
        res.send({msg:error});
    }
    
});



// applying multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../client/recipe-client/images");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + "-"+ file.originalname);
        console.log(file);
    }
});
const upload = multer({
    storage:storage,
    limits:{fileSize:1000000}
});





// verifying before creating new recipe
router.post("/create-recipe",upload.single("image"),async (req,res)=>{
    try {
    const {userId,name,description,ingredients,instructions,time} = req.body;
    const user = await userModel.findById(userId);
     const newRecipe = await recipeModel.create({
        name,
        description,
        ingredients,
        instructions,
        image:`images/${req.file.filename}`,
        time,
        recipeOwner:userId
    });
    console.log(user.postedRecipes);
    user.postedRecipes.push(newRecipe);
    await user.save();
    console.log(user);
    return res.json(user);   
    } catch (error) {
        res.send({msg:error});
    }
});



router.patch("/saved-recipes",async (req,res)=>{
    try {
        const {userId,recipeId} = req.body;
        const user = await userModel.findById(userId);
        const recipe = await recipeModel.findById(recipeId);
        user.savedRecipes.push(recipe);
        await user.save();
        console.log(user);
        res.json({savedRecipes:user.savedRecipes}); 
    } catch (error) {
        res.send(error);
    }
});


router.post("/saved-recipes",async(req,res)=>{
    try {
    const {userId,recipeId} = req.body;
    const user = await userModel.findById(userId);
    if(!recipeId){
        return res.json(user.savedRecipes);
    }
    const recipe = await recipeModel.findById(recipeId);
    const updatedUser = user.savedRecipes.filter((r)=>{
        return r._id.toString() !== recipe._id.toString();
    })
    user.savedRecipes = updatedUser;
    console.log(user);
    await user.save();
    res.json(user.savedRecipes);    
    } catch (error) {
        res.send(error);
    } 
});


router.post("/profile",async(req,res)=>{
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);

        if(user){
            return res.json(user);
        }
    } catch (error) {
        
    }
})





module.exports = router;