import express from "express";
import {registerControllers, loginController} from "../controllers/auth.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";


const routes = express.Router()


routes.post('/register', registerControllers )
routes.post('/login', loginController)
routes.get('/profile', authMiddleware, (req,res)=>{
    res.status(200).json({
        success:true,
        user: req.user
    })
})

export default routes