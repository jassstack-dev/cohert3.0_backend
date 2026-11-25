import { Router } from "express";
import { getMeMiddleware } from "../middlewares/auth.middleware.js";
import { addToCartValidation } from "../validator/cart.validator.js";
import { cartContoller, clearCartController, decreaseCartQuantityController } from "../controllers/cart.controller.js";

const router = Router()

router.post('/',getMeMiddleware, addToCartValidation, cartContoller )
router.delete('/:itemId',getMeMiddleware, clearCartController )
router.patch(
    '/:itemId/decrease',
    getMeMiddleware,
    decreaseCartQuantityController
);


export default router