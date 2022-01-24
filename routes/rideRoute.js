const express = require("express")
const { protect } = require("../controllers/authController")
const { createRide, updateRide, getRide, getRides } = require("../controllers/rideController")
const router = express.Router()

router.post("/", protect, createRide)
router.patch("/:id", protect, updateRide)
router.get("/:id", protect, getRide)
router.get("/", protect, getRides)

module.exports = router