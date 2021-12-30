const Company = require("../models/companyModel");

exports.createCompany = async (req, res, next) => {
    try {

        const query = Company.find()
        const count = await query.count()
        req.body.internalIdForBusiness = `C-${count}`
        const company = await Company.create(req.body)
        if (!company) {
            res.status(404).json({
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