import express from 'express'
import userModel from '../models/auth.model.js'
import { createAccessRefressToken } from '../utils/main.js'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import cookie from 'cookie-parser'
import authMiddleware from '../middleware/auth.middleware.js';
import config from '../config/config.js';

const routes = express.Router()


// POST - api/auth/register
routes.post('/register',async (req,res)=>{
   try {
     const {name, email, password} = req.body
    
    const isEmail = await userModel.findOne({email})

    if(isEmail){
        return res.status(400).json({
            success:false,
            message: 'user already  registered login now'
        })
    }

    const user = await userModel.create({
        name, email, password : await bcrypt.hash(password, 10)
    })

    const {accessToken, refreshToken} = await createAccessRefressToken({userId : user._id})

    user.refreshToken =refreshToken,
   res.cookie('refreshToken', refreshToken, {
    httpOnly:true
   })
    await user.save()

    return res.status(201).json({
        success:true,
        message: 'user created successfully',
        user: {
            name, email
        },
        accessToken : accessToken
    })
    
   } catch (error) {
    res.status(500).json({
        success:false,
        message:'internal server error'
    })
   }

})

//  /api/auth/me
routes.get('/me', authMiddleware, async(req,res)=>{
    return res.status(200).json({
        success:true,
        message: 'user found successfully',
        user: req.user
    })
})

// /api/auth/login

routes.post('/login',async (req,res)=>{
  
try {

      const {email, password} = req.body

    const user = await userModel.findOne({email})
    


    if(!user){
        return res.status(400).json({
            message:'user not found'
        })
    }

    const isPassword = await bcrypt.compare(password,user.password)
    if(!isPassword){
        return res.status(400).json({
            message: 'password invalid'
        })
    }

    const {accessToken, refreshToken} = await createAccessRefressToken({userId : user._id})

    

    user.refreshToken = refreshToken
    res.cookie('refreshToken', refreshToken, {
        httpOnly:true
    })
    user.save()

    return res.status(200).json({
        message: "user logged in successfully",
        user: {
            _id: user._id,
            email: user.email
        },
        accessToken: accessToken

    })

    
} catch (error) {
    console.log('error in login api', error)
    
}

})

routes.post('/refress-token', async (req,res)=>{
   try {

     const incomingRefreshToken = req.cookies.refreshToken

    if(!incomingRefreshToken){
        return res.status(401).json({
            message: 'please login again'
        })
    }

    const decoded = jwt.verify(incomingRefreshToken, config().refress_key)


    const user = await userModel.findById(decoded.userId)

    if(!user){
        return res.status(400).json({
            message :'Invalid refresh token. Please login again'
        })
    }

    const {accessToken} = await createAccessRefressToken({user: user._id})

    return res.status(201).json({
        message:'access token generated successfully',
        accessToken
    })

    
   } catch (error) {
    console.log('error in the refress token api', error)
    
   }

})

export default routes