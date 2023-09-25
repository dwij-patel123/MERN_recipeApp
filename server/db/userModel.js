const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    savedRecipes:[{
        name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ingredients:[{
        type:String,
        required:true
    }],
    instructions:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    },
    recipeOwner:{
        type:mongoose.Schema.Types.ObjectId
    }
    }],
    postedRecipes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"recipes"
    }]
});

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;