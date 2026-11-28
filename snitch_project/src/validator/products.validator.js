
import { body, validationResult } from "express-validator";

export const productValidation = [
  // Title
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  // Description
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required"),

  // Price
  body("price")
    .custom((value) => {
      if (
        !value ||
        typeof value !== "object" ||
        typeof value.amount !== "number" ||
        !Number.isFinite(value.amount) ||
        value.amount < 0 ||
        !["INR", "USD"].includes(value.currency)
      ) {
        throw new Error("Invalid price format");
      }

      return true;
    }),

  // Images
  body("images")
    .isArray({ min: 1, max: 5 })
    .withMessage("Images must contain between 1 and 5 URLs"),

  body("images.*")
    .isURL()
    .withMessage("Each image must be a valid URL"),

  // Category
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "electronics",
      "fashion",
      "home",
      "sports",
      "beauty",
      "books"
    ])
    .withMessage("Invalid product category"),

  // Variants
  body("variants")
    .isArray({ min: 1 })
    .withMessage("At least one variant is required"),

  body("variants.*.size")
    .notEmpty()
    .withMessage("Variant size is required")
    .isIn(["S", "M", "L", "XL", "XXL"])
    .withMessage("Invalid variant size"),

  body("variants.*.stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer")
];

// Validation error handler
export const validateProduct = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};
