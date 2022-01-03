const express = require("express")
const { protect } = require("../controllers/authController")
const { createBrand, updateBrand, getBrand, getBrands } = require("../controllers/brandController")
const router = express.Router()

router.post("/", protect, createBrand)
router.patch("/:id", protect, updateBrand)
router.get("/:id", protect, getBrand)
router.get("/", protect, getBrands)

module.exports = router