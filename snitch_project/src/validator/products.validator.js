
import { body, validationResult } from "express-validator";

export const productValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required"),

  body("price")
    .custom((value) => {
      const price = typeof value === "string"
        ? JSON.parse(value)
        : value;

      if (
        !price ||
        typeof price !== "object" ||
        typeof price.amount !== "number" ||
        price.amount <= 0 ||
        price.currency !== "INR"
      ) {
        throw new Error("Invalid price format");
      }

      return true;
    }),

  body("variants")
    .custom((value) => {
      const variants = typeof value === "string"
        ? JSON.parse(value)
        : value;

      if (!Array.isArray(variants) || variants.length === 0) {
        throw new Error("At least one variant is required");
      }

      for (const variant of variants) {
        if (
          !variant.size ||
          typeof variant.size !== "string" ||
          !Number.isInteger(variant.stock) ||
          variant.stock < 0
        ) {
          throw new Error("Invalid variant size or stock");
        }
      }

      return true;
    }),
];

// Validation error handler
export const validateProduct = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};
