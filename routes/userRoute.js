const express = require("express")
const { protect } = require("../controllers/authController")
const { getUser, getUsers } = require("../controllers/userController")

const router = express.Router()

router.get("/", protect, getUsers)
router.get("/:id", protect, getUser)

module.exports = router