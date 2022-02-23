const express = require("express")
const { signup, signin, protect,validateUser } = require("../controllers/authController")
const router = express.Router()

router.post("/signup", protect,validateUser, signup)
router.post("/signin", signin)

module.exports = router