const express = require("express")
const { createBrand, updateBrand, getBrand, getBrands } = require("../controllers/brandController")
const router = express.Router()

router.post("/", createBrand)
router.patch("/:id", updateBrand)
router.get("/:id", getBrand)
router.get("/", getBrands)

module.exports = router