const express = require("express")
const { createCategory, updateCategory, getCategory, getCategories } = require("../controllers/categoryController")
const router = express.Router()

router.post("/", createCategory)
router.patch("/:id", updateCategory)
router.get("/:id", getCategory)
router.get("/", getCategories)

module.exports = router