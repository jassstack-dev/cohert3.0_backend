import { body,  validationResult } from "express-validator";


export const addToCartValidation = [
    body('product')
    .notEmpty()
    .withMessage('Product id is required')
    .isMongoId()
    .withMessage('Invalid product id'),

    body('size')
    .trim()
    .notEmpty().withMessage('product size is required')
    .isIn(["S", "M", "L", "XL", "XXL"]).withMessage('invalid product size'),

    body('quantity')
    .trim()
    .notEmpty().withMessage('quantity is required')
    .isInt({min:1}).withMessage('quantity must be at least 1')
    .toInt()

]

export const validateCart = (req,res, next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
         return res.status(400).json({
            success: false,
            message: 'error in the add to cart validation',
            errors: errors.array()
        });
    }

    next()
}