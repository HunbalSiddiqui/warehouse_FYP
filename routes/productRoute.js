const express = require("express")
const { createProduct, getProduct, getProducts, updateProduct } = require("../controllers/productController")

const router = express.Router()

router.post("/", createProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.patch("/:id", updateProduct);

module.exports = router