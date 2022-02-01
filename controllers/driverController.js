const Driver = require("../models/driverModel");

exports.createDriver = async (req, res, next) => {
    try {
        // check if driver exist
        var driver = await Driver.findOne({ name: req.body.name })

        if (driver) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "This driver already exists in the system.",
            });
        }

        driver = await Driver.create(req.body)
        if (!driver) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Invalid data provided. Driver was not provided",
            });
        }
        res.status(200).json({
            success: true,
            status: "success",
            data: {
                driver
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

exports.getDrivers = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        var drivers = await Driver.find().skip(skip).limit(limit);
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await Driver.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
            data: {
                drivers
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

exports.getDriver = async (req, res, next) => {
    try {
        var driver = await Driver.findOne({ _id: req.params.id });
        if (!driver) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Driver does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                driver
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

exports.updateDriver = async (req, res, next) => {
    try {
        var driver = await Driver.findOne({ _id: req.params.id });
        if (!driver) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Driver does not exist.",
            });
        }
        driver = await Driver.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                driver
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