import { Router } from "express";
import { getMeMiddleware } from "../middlewares/auth.middleware.js";
import { addToCartValidation } from "../validator/cart.validator.js";
import { cartContoller } from "../controllers/cart.controller.js";

const router = Router()

router.post('/',getMeMiddleware, addToCartValidation, cartContoller )


export default router