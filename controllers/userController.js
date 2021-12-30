const User = require("../models/userModel");

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