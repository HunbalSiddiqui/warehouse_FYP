const Ride = require("../models/rideModel");

exports.createRide = async (req, res, next) => {
    try {
        var ride = await Ride.create(req.body)

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                ride,
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

exports.updateRide = async (req, res, next) => {
    try {
        var ride = await Ride.findOne({ _id: req.params.id });
        if (!ride) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "ride does not exist.",
            });
        }
        ride = await Ride.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                ride
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

exports.getRides = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 0;
        var skip = (page - 1) * limit;

        var rides = await Ride.find().skip(skip).limit(limit);
        if (limit > 0) {
            var totalPages = Math.ceil((await Ride.countDocuments()) / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            data: {
                rides
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

exports.getRide = async (req, res, next) => {
    try {
        var ride = await Ride.findOne({ _id: req.params.id });
        if (!ride) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "ride does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                ride
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