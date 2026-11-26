import { Router } from "express";
import { getMeMiddleware } from "../middlewares/auth.middleware.js";
import { addToCartValidation } from "../validator/cart.validator.js";
import { cartContoller, clearCartController, decreaseCartQuantityController, getCartController, increaseCartQuantiyController } from "../controllers/cart.controller.js";

const router = Router()

router.post('/',getMeMiddleware, addToCartValidation, cartContoller )
router.get('/',getMeMiddleware,  getCartController )

router.delete('/:itemId',getMeMiddleware, clearCartController )
router.patch(
    '/:itemId/decrease',
    getMeMiddleware,
    decreaseCartQuantityController
);
router.patch(
    '/:itemId/increase',
    getMeMiddleware,
    increaseCartQuantiyController
);


export default router