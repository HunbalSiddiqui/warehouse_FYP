const express = require("express")
const { protect } = require("../controllers/authController")
const { createVehicleType, getVehicleTypes, getVehicleType, updateVehicleType } = require("../controllers/vehicleTypeController")
const router = express.Router()

router.post("/", protect, createVehicleType)
router.get("/", protect, getVehicleTypes)
router.get("/:id", protect, getVehicleType)
router.patch("/:id", protect, updateVehicleType)

module.exports = router