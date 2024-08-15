const {default: mongoose} = require("mongoose");
const UserSchema = new mongoose.Schema({
    fullname :{
        type:String,
    },
    role:{
        type:String,
        require:true,
    },
    email:{
        type:String ,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    updatedAt:{
        type:Date,
        default: Date.now(),
    },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports= UserModel;