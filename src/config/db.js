const {default:mongoose} = require("mongoose");
//**@format */
require("dotenv").config();
const dbUrl = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.bjrpm.mongodb.net/Sale-Product`;
const connectDB = async (app)=>{
    try{
        const connection = await mongoose.connect(dbUrl);
        console.log("Connect to mongoose db successfully!!!");
    }
    catch(error){
        console.log(error);
        process.exit(1);
        
    }
};
module.exports= connectDB;