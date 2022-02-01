const Vendor = require("../models/vendorModel");

exports.createVendor = async (req, res, next) => {
    try {
        // check if vendor exist
        var vendor = await Vendor.findOne({ name: req.body.name })

        if (vendor) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "This vendor already exists in the system.",
            });
        }

        const query = Vendor.find()
        const count = await query.count()
        req.body.internalIdForBusiness = `V-${count}`
        vendor = await Vendor.create(req.body)
        if (!vendor) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Invalid data provided. Vendor was not provided",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                vendor
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

exports.getVendors = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        var vendors = await Vendor.find().skip(skip).limit(limit);
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await Vendor.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
            data: {
                vendors
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

exports.getVendor = async (req, res, next) => {
    try {
        var vendor = await Vendor.findOne({ _id: req.params.id });
        if (!vendor) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Vendor does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                vendor
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

exports.updateVendor = async (req, res, next) => {
    try {
        var vendor = await Vendor.findOne({ _id: req.params.id });
        if (!vendor) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Vendor does not exist.",
            });
        }
        vendor = await Vendor.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                vendor
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