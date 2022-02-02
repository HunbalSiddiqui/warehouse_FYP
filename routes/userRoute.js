const express = require("express")
const { protect } = require("../controllers/authController")
const { getUser, getUsers, updateUser } = require("../controllers/userController")

const router = express.Router()

router.get("/", protect, getUsers)
router.get("/:id", protect, getUser)
router.patch("/:id", protect, updateUser)

module.exports = router