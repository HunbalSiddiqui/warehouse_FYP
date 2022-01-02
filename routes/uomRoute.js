const express = require("express")
const { createUOM, updateUOM, getUOM, getUOMs } = require("../controllers/uomController")
const router = express.Router()

router.post("/", createUOM)
router.patch("/:id", updateUOM)
router.get("/:id", getUOM)
router.get("/", getUOMs)

module.exports = router