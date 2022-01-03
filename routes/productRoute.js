const express = require("express")
const { protect } = require("../controllers/authController")
const { createProduct, getProduct, getProducts, updateProduct } = require("../controllers/productController")

const router = express.Router()

router.post("/", protect, createProduct)
router.get("/", protect, getProducts)
router.get("/:id", protect, getProduct)
router.patch("/:id", protect, updateProduct);

module.exports = router