const express = require('express')
const upload = require('../config/multer')
const { multerController } = require('../controlllers/multer.controllers')

const routes = express.Router()

routes.post('/create', upload.single('images'),multerController)

module.exports = routes