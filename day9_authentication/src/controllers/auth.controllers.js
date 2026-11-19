import userModel from "../module/user.module.js";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import jwt from 'jsonwebtoken'

export const registerControllers = async (req,res)=>{
try {
    
    const {name, email, password} = req.body

    
if (!name || !email || !password) {
    return res.status(400).json({
        success: false,
        message: "All fields are required"
    });
}



const user = await userModel.create({
    name, email, password : await bcrypt.hash(password, 10)
})

const accessToken = jwt.sign(
    {userId : user._id},
    config.JWT_SECRET,
    {expiresIn: "15m"}
)

return res.status(201).json({
    success :true,
    message: "user created successfully",
    accessToken,
    data: user
})
    
} catch (error) {
    res.status(500).json({
        success:false,
        message : 'internal server error'
    })
}

}

export const loginController = async (req, res)=>{
    try {

const {email, password} = req.body

if(!email ||!password){
    return res.status(401).json({
        success:false,
        message:"invalid credential"
    })
}

const user = await userModel.findOne({
    email
})

    if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


const isPassword = bcrypt.compare(password, user.password)

if(!isPassword){
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
}

const accessToken = jwt.sign(
    { userId: user._id },
    config.JWT_SECRET,
    { expiresIn: "15m" }
);


return res.status(200).json({
    success:true,
    message: "user logged in successfully",
    accessToken,
    data: user
})

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message : 'internal server error'
        })
    }
}


