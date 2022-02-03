const Role = require("../models/roleModel");

exports.getRoles = async (req, res, next) => {
    try {

        var roles = await Role.find()

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                roles
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
