const express = require("express")
const { protect } = require("../controllers/authController")
const { createProductOutward } = require("../controllers/productOutwardController")
const router = express.Router()

router.post("/", protect, createProductOutward)

module.exports = router