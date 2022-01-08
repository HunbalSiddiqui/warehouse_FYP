const express = require("express")
const { protect } = require("../controllers/authController")
const { createDispatchOrder } = require("../controllers/dispatchOrderController")
const router = express.Router()

router.post("/", protect, createDispatchOrder)


module.exports = router