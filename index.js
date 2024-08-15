const express = require("express");
const cors = require("cors");
const authRouter= require('./src/routes/authRoutes');
const productRouter = require("./src/routes/productRoutes");
const connectDB = require('./src/config/db');
const errorMiddleHandle= require("./src/middlewares/errorMiddleWare");
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
const PORT = 5000;
app.use('/auth', authRouter);
app.use('/product', productRouter);
connectDB();
app.use(errorMiddleHandle)
app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`server starting at http://localhost:${PORT}`);
    
})