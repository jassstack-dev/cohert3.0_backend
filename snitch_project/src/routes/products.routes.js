import express from 'express'
import { getMeMiddleware } from '../middlewares/auth.middleware.js'
import productModel from '../model/products.model.js';
import multer from 'multer'
import { productValidation } from '../validator/products.validator.js';
import { convertStringtoObject, sellerMiddleware } from '../middlewares/products.middleware.js';
import { createProductsController } from '../controllers/products.controllers.js';

const productsRouter = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
});




productsRouter.post('/', getMeMiddleware,sellerMiddleware , upload.array('images'),productValidation,convertStringtoObject , createProductsController );


export default productsRouter