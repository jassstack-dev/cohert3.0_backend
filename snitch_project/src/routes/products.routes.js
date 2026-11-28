import express from "express";
import { getMeMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { productValidation } from "../validator/products.validator.js";
import {
  convertStringtoObject,
  sellerMiddleware,
} from "../middlewares/products.middleware.js";
import { createProductsController, filterController, listedProductsController, searchController } from "../controllers/products.controllers.js";

const productsRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});


// create product routes
productsRouter.post(
  "/",
  getMeMiddleware,
  sellerMiddleware,
  upload.array("images"),
  productValidation,
  convertStringtoObject,
  createProductsController,
);



// get product routes
productsRouter.get('/',getMeMiddleware, listedProductsController)
productsRouter.get('/search',getMeMiddleware, searchController)
productsRouter.get('/filter',getMeMiddleware, filterController)

export default productsRouter;
