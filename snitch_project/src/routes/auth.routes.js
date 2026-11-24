import express from 'express'
import { loginValidator, registerValidator } from '../validator/auth.validator.js'
import { getMeController, loginController, refreshTokenController, registrController } from '../controllers/auth.controller.js'
import { getMeMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()


router.post('/register', registerValidator, registrController  )
router.post('/login', loginValidator, loginController)
router.post('/refresh-token', refreshTokenController)
router.get('/getme', getMeMiddleware, getMeController)

export default router