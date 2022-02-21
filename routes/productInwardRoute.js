const express = require("express")
const { protect } = require("../controllers/authController")
const { createProductIward, getProductInwards, getProductInward, getInwardRelations, exportProductInwards } = require("../controllers/productInwardController")
const router = express.Router()

router.post("/", protect, createProductIward)
router.get("/", protect, getProductInwards)
router.get("/relations", protect, getInwardRelations)
router.get("/export", protect, exportProductInwards)
router.get("/:id", protect, getProductInward)

module.exports = router