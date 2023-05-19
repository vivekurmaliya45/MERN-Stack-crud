// An express.js middleware for validator
const { check } = require("express-validator");

exports.productValidationRules = [
  check("ProductName")
    .trim()
    .notEmpty()
    .withMessage("ProductName is required")
    .isLength({ max: 25 })
    .escape()
    .withMessage("ProductName should be less than 25 charecter"),
  check("Price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isLength({ max: 10 })
    .withMessage("Price should be less than 10 digit")
    .escape(),
  check("Quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required")
    .isLength({ max: 10 })
    .withMessage("Quantity should be less than 10 digit")
    .escape(),
  check("Stock")
    .trim()
    .notEmpty()
    .withMessage("Stock is required")
    .isLength({ max: 10 })
    .withMessage("Stock should be less than 10 digit")
    .escape(),
];
