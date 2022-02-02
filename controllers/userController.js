const User = require("../models/userModel");

exports.getUsers = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        var users = await User.find().skip(skip).limit(limit);
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await User.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }
        users = users.map((user) => {
            user.password = null
            return user
        })
        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
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
        const user = await User.findOne({ _id: req.params.id }).select("+password")
        if (!user) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "User does not exist.",
            });
        }
        user.password = null
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                user
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

exports.updateUser = async (req, res, next) => {
    try {
        var user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "user does not exist.",
            });
        }
        user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                user
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