const express = require("express")
const { createWarehouse, updateWarehouse, getWarehouse, getWarehouses } = require("../controllers/warehouseController")
const router = express.Router()

router.post("/", createWarehouse)
router.patch("/:id", updateWarehouse)
router.get("/:id", getWarehouse)
router.get("/", getWarehouses)

module.exports = router