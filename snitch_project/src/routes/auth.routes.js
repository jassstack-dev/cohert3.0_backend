import express from 'express'
import { registerValidator } from '../validator/auth.validator.js'
import { registrController } from '../controllers/auth.controller.js'

const router = express.Router()


router.post('/register', registerValidator, registrController  )


export default router