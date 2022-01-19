const express = require("express")
const { protect } = require("../controllers/authController")
const { createVendor, getVendors, getVendor, updateVendor } = require("../controllers/vendorController")

const router = express.Router()

router.post("/", protect, createVendor)
router.get("/", protect, getVendors)
router.get("/:id", protect, getVendor)
router.patch("/:id", protect, updateVendor);

module.exports = router