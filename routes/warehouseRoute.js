const express = require("express")
const { protect } = require("../controllers/authController")
const { createWarehouse, updateWarehouse, getWarehouse, getWarehouses } = require("../controllers/warehouseController")
const router = express.Router()

router.post("/", protect, createWarehouse)
router.patch("/:id", protect, updateWarehouse)
router.get("/:id", protect, getWarehouse)
router.get("/", protect, getWarehouses)

module.exports = router