const express = require("express")
const { protect } = require("../controllers/authController")
const { createUOM, updateUOM, getUOM, getUOMs } = require("../controllers/uomController")
const router = express.Router()

router.post("/", protect, createUOM)
router.patch("/:id", protect, updateUOM)
router.get("/:id", protect, getUOM)
router.get("/", protect, getUOMs)

module.exports = router