const express = require("express")
const { createCompany, getCompanies, getCompany, updateCompany } = require("../controllers/companyController")

const router = express.Router()

router.post("/", createCompany)
router.get("/", getCompanies)
router.get("/:id", getCompany)
router.patch("/:id", updateCompany);

module.exports = router