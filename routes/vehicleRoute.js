const express = require("express")
const { protect } = require("../controllers/authController")
const { createVehicle, getVehicles, getVehicle, updateVehicle } = require("../controllers/vehicleController")
const router = express.Router()

router.post("/", protect, createVehicle)
router.get("/", protect, getVehicles)
router.get("/:id", protect, getVehicle)
router.patch("/:id", protect, updateVehicle)

module.exports = router