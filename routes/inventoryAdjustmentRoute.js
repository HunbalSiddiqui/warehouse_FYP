const express = require("express")
const { protect } = require("../controllers/authController")
const { createInventoryAdjustment, getInventoryAdjustments, getInventoryAdjustment, deleteInventoryAdjustment } = require("../controllers/inventoryAdjustmentController")
const router = express.Router()

router.post("/", protect, createInventoryAdjustment)
router.get("/", protect, getInventoryAdjustments)
router.get("/:id", protect, getInventoryAdjustment)
router.delete("/:id", protect, deleteInventoryAdjustment)

module.exports = router