const Uom = require("../models/uomModel");

exports.createUOM = async (req, res, next) => {
    try {
        // check if brand exists
        var uom = await Uom.findOne({ name: req.body.name })
        if (uom) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "This uom already exists in the system.",
            });
        }

        uom = await Uom.create(req.body)

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                uom,
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

exports.updateUOM = async (req, res, next) => {
    try {
        var uom = await Uom.findOne({ _id: req.params.id });
        if (!uom) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "uom does not exist.",
            });
        }
        uom = await Uom.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                uom
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

exports.getUOMs = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        var uoms = await Uom.find().skip(skip).limit(limit);
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await Uom.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
            data: {
                uoms
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

exports.getUOM = async (req, res, next) => {
    try {
        var uom = await Uom.findOne({ _id: req.params.id });
        if (!uom) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "uom does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                uom
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