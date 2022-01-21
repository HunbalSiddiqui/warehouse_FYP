const Vehicle = require("../models/vehicleModel");

exports.createVehicle = async (req, res, next) => {
    try {
        // check if vehicle exist
        var vehicle = await Vehicle.findOne({ registrationNumber: req.body.registrationNumber })

        if (vehicle) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "This vehicle already exists in the system.",
            });
        }

        vehicle = await Vehicle.create(req.body)
        if (!vehicle) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Invalid data provided. Vehicle was not provided",
            });
        }

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                vehicle
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

exports.getVehicles = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 0;
        var skip = (page - 1) * limit;

        var vehicles = await Vehicle.find().skip(skip).limit(limit);

        if (limit > 0) {
            var totalPages = Math.ceil((await Vehicle.countDocuments()) / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            data: {
                vehicles
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

exports.getVehicle = async (req, res, next) => {
    try {
        var vehicle = await Vehicle.findOne({ _id: req.params.id });
        if (!vehicle) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Vehicle does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                vehicle
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

exports.updateVehicle = async (req, res, next) => {
    try {
        var vehicle = await Vehicle.findOne({ _id: req.params.id });
        if (!vehicle) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Vehicle does not exist.",
            });
        }
        vehicle = await Vehicle.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                vehicle
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