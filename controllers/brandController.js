const Brand = require("../models/brandModel");

exports.createBrand = async (req, res, next) => {
    try {
        // check if brand exists
        var brand = await Brand.findOne({ name: req.body.name })

        if (brand) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "This brand already exists in the system.",
            });
        }

        brand = await Brand.create(req.body)

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                brand,
            },
        })

    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.updateBrand = async (req, res, next) => {
    try {
        var brand = await Brand.findOne({ _id: req.params.id });
        if (!brand) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "brand does not exist.",
            });
        }
        brand = await Brand.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                brand
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

exports.getBrands = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        var brands = await Brand.find().skip(skip).limit(limit);
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await Brand.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }
        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
            data: {
                brands
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

exports.getBrand = async (req, res, next) => {
    try {
        var brand = await Brand.findOne({ _id: req.params.id });
        if (!brand) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "brand does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                brand
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