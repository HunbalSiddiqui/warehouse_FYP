const express = require("express")
const { createCompany, getCompanies } = require("../controllers/companyController")

const router = express.Router()

router.post("/", createCompany)
router.get("/", getCompanies)

module.exports = router