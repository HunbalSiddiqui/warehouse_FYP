const Company = require("../models/companyModel");

exports.createCompany = async (req, res, next) => {
    try {
        const query = Company.find()
        const count = await query.count()
        req.body.internalIdForBusiness = `C-${count}`
        const company = await Company.create(req.body)
        if (!company) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Invalid data provided. Company was not provided",
            });
        }
        res.status(200).json({
            success: true,
            status: "success",
            data: {
                company
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.getCompanies = async (req, res, next) => {
    try {
        var companies = await Company.find();

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                companies
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.getCompany = async (req, res, next) => {
    try {
        var company = await Company.findOne({ _id: req.params.id });
        if (!company) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Company does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                company
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.updateCompany = async (req, res, next) => {
    try {
        var company = await Company.findOne({ _id: req.params.id });
        if (!company) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Company does not exist.",
            });
        }
        company = await Company.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                company
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}