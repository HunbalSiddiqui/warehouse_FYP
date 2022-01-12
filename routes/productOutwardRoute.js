const express = require("express")
const { protect } = require("../controllers/authController")
const { createProductOutward, getProductOutwards, getProductOutward } = require("../controllers/productOutwardController")
const router = express.Router()

router.post("/", protect, createProductOutward)
router.get("/", protect, getProductOutwards)
router.get("/:id", protect, getProductOutward)

module.exports = router