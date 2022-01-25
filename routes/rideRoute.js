const express = require("express")
const { protect } = require("../controllers/authController")
const { createRide, updateRide, getRide, getRides, getRelations } = require("../controllers/rideController")
const router = express.Router()

router.post("/", protect, createRide)
router.patch("/:id", protect, updateRide)
router.get("/relations", protect, getRelations)
router.get("/:id", protect, getRide)
router.get("/", protect, getRides)

module.exports = router