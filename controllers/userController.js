const User = require("../models/userModel");

exports.getUsers = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 0;
        var skip = (page - 1) * limit;

        var users = await User.find().skip(skip).limit(limit);

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                users,
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

exports.getUser = async (req, res, next) => {
    try {
        // const user = await User.findOne({ _id: req.body.userId }).select("+password")
        return res.status(200).json({
            success: true,
            status: "success",
            // token: token,
            data: {
                user: req.body.user,
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