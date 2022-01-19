const express = require("express")
const { protect } = require("../controllers/authController")
const { createDriver, getDrivers, getDriver, updateDriver } = require("../controllers/driverController")

const router = express.Router()

router.post("/", protect, createDriver)
router.get("/", protect, getDrivers)
router.get("/:id", protect, getDriver)
router.patch("/:id", protect, updateDriver);

module.exports = router