const express = require("express")
const { protect } = require("../controllers/authController")
const { createDispatchOrder, getDispatchOrders, getDispatchOrder, getDispatchOrderRelations, getWarehouses, getProducts, getInventory } = require("../controllers/dispatchOrderController")
const router = express.Router()

router.get("/", protect, getDispatchOrders)
router.post("/", protect, createDispatchOrder)
router.get("/warehouses/:companyId", protect, getWarehouses)
router.get("/products/:companyId/:warehouseId", protect, getProducts)
router.get("/inventories/:companyId/:warehouseId/:productId", protect, getInventory)
router.get("/relations", protect, getDispatchOrderRelations)
router.get("/:id", protect, getDispatchOrder)

module.exports = router