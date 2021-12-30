const express = require("express")
const { protect } = require("../controllers/authController")
const { getUser } = require("../controllers/userController")

const router = express.Router()

router.get("/:id", protect, getUser)

module.exports = router