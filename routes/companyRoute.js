const express = require("express")
const { protect } = require("../controllers/authController")
const { createCompany, getCompanies, getCompany, updateCompany } = require("../controllers/companyController")

const router = express.Router()

router.post("/", protect, createCompany)
router.get("/", protect, getCompanies)
router.get("/:id", protect, getCompany)
router.patch("/:id", protect, updateCompany);

module.exports = router