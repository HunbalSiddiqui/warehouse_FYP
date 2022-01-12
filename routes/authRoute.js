const express = require("express")
const { signup, signin, protect } = require("../controllers/authController")
const router = express.Router()

router.post("/signup", protect, signup)
router.post("/signin", signin)

module.exports = router