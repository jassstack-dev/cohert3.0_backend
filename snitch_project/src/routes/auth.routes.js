import express from 'express'
import { loginValidator, registerValidator } from '../validator/auth.validator.js'
import { loginController, refreshTokenController, registrController } from '../controllers/auth.controller.js'

const router = express.Router()


router.post('/register', registerValidator, registrController  )
router.post('/login', loginValidator, loginController)
router.post('/refresh-token', refreshTokenController)

export default router