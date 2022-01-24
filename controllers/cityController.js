const City = require("../models/cityModel");

exports.getCities = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 0;
        var skip = (page - 1) * limit;

        var cities = await City.find().skip(skip).limit(limit);
        if (limit > 0) {
            var totalPages = Math.ceil((await City.countDocuments()) / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            data: {
                cities
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