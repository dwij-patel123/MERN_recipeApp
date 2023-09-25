const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
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
});

const recipeModel = mongoose.model("recipe",recipeSchema);

module.exports = recipeModel;

