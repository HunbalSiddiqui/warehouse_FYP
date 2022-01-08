const express = require("express")
const { protect } = require("../controllers/authController")
const { getInventories, getInventory, exportInventory } = require("../controllers/inventoryController")
const router = express.Router()

router.get("/", protect, getInventories)
router.get("/export", protect, exportInventory)
router.get("/:id", protect, getInventory)

module.exports = router