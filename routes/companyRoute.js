const express = require("express")
const { createCompany, getCompanies, getCompany } = require("../controllers/companyController")

const router = express.Router()

router.post("/", createCompany)
router.get("/", getCompanies)
router.get("/:id", getCompany)

module.exports = router