const express = require("express")
const { protect } = require("../controllers/authController")
const { createProductOutward, getProductOutwards, getProductOutward, getProductOutwardRelations } = require("../controllers/productOutwardController")
const router = express.Router()

router.get("/", protect, getProductOutwards)
router.post("/", protect, createProductOutward)
router.get("/relations", protect, getProductOutwardRelations)
router.get("/:id", protect, getProductOutward)

module.exports = router