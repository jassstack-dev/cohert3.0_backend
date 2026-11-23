import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique: true
    }, 
    name :{
        type: String,
        required:true
    }, 
    password: {
        type:String,
    },
    role : {
        type:String,
        enum : ['user', 'seller'],
         default: "user",
    }, 
    refreshToken :{
        type:String
    }
})

const userModel = mongoose.model('users', userSchema)
export default userModel