const express = require("express")
const { protect } = require("../controllers/authController")
const { createDispatchOrder, getDispatchOrders, getDispatchOrder, getDispatchOrderRelations } = require("../controllers/dispatchOrderController")
const router = express.Router()

router.get("/", protect, getDispatchOrders)
router.post("/", protect, createDispatchOrder)
router.get("/relations", protect, getDispatchOrderRelations)
router.get("/:id", protect, getDispatchOrder)

module.exports = router