const express = require("express")
const { protect } = require("../controllers/authController")
const { getRoles } = require("../controllers/roleController")
const router = express.Router()

router.get("/", protect, getRoles)

module.exports = router