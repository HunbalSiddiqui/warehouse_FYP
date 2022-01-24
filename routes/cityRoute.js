const express = require("express")
const { protect } = require("../controllers/authController")
const { getCities } = require("../controllers/cityController")
const router = express.Router()

router.get("/", protect, getCities)

module.exports = router