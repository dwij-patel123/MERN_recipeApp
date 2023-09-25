const express = require("express");
const app = express();
const connectDB = require("./db/connect.js");
require("dotenv").config();
const cors = require("cors");
const cookie_par = require("cookie-parser");
const PORT = process.env.port || 3002;

app.use(cookie_par());
app.use(cors());

//middleware for accepting json format
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//user auth routes
app.use("/api/auth",require("./routes/userAuth.js"));
// recipe routes
app.use("/api/recipes",require("./routes/recipes.js"));


const start= async ()=>{
    try {
    await connectDB(process.env.MONGO_URI);
    console.log("mongo connected...");
    app.listen(PORT,console.log(`the server is listening on port ${PORT}`));    
    } catch (error) {
        console.log(error);
    } 
}

start();