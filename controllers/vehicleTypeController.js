const VehicleType = require("../models/vehicleTypeModel");

exports.createVehicleType = async (req, res, next) => {
    try {
        // check if vehicleType exist
        var vehicleType = await VehicleType.findOne({ name: req.body.name })

        if (vehicleType) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "This vehicle type already exists in the system.",
            });
        }

        vehicleType = await VehicleType.create(req.body)
        if (!vehicleType) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Invalid data provided. Vehicle Type was not provided",
            });
        }

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                vehicleType
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

exports.getVehicleTypes = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        var vehicleTypes = await VehicleType.find().skip(skip).limit(limit);
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await VehicleType.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
            data: {
                vehicleTypes
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

exports.getVehicleType = async (req, res, next) => {
    try {
        var vehicleType = await VehicleType.findOne({ _id: req.params.id });
        if (!vehicleType) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Vehicle Type does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                vehicleType
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

exports.updateVehicleType = async (req, res, next) => {
    try {
        var vehicleType = await VehicleType.findOne({ _id: req.params.id });
        if (!vehicleType) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Vehicle Type does not exist.",
            });
        }
        vehicleType = await VehicleType.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                vehicleType
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