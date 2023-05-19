const express = require("express");

// The express.Router() function is used to create a new router object.
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController.js");
const { productValidationRules } = require("../utils/productValidations.js");

router.route("/product/create").post(productValidationRules, createProduct);
router.route("/product/get").get(getProducts);
router.route("/product/get/:id").get(getProductById);
router.route("/product/update/:id").put(productValidationRules, updateProduct);
router.route("/product/delete/:id").delete(deleteProduct);

module.exports = router;
