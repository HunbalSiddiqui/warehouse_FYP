const express = require("express")
const { protect } = require("../controllers/authController")
const { createCategory, updateCategory, getCategory, getCategories } = require("../controllers/categoryController")
const router = express.Router()

router.post("/", protect, createCategory)
router.patch("/:id", protect, updateCategory)
router.get("/:id", protect, getCategory)
router.get("/", protect, getCategories)

module.exports = router