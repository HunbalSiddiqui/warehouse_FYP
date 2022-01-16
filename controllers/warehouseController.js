const Warehouse = require("../models/warehouseModel");

exports.createWarehouse = async (req, res, next) => {
    try {
        // check if brand exists
        var warehouse = await Warehouse.findOne({ name: req.body.name })

        if (warehouse) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "This warehouse already exists in the system.",
            });
        }

        warehouse = await Warehouse.create(req.body)

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                warehouse,
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

exports.updateWarehouse = async (req, res, next) => {
    try {
        var warehouse = await Warehouse.findOne({ _id: req.params.id });
        if (!warehouse) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "warehouse does not exist.",
            });
        }
        warehouse = await Warehouse.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                warehouse
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

exports.getWarehouses = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 0;
        var skip = (page - 1) * limit;

        var warehouses = await Warehouse.find().skip(skip).limit(limit);

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                warehouses
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

exports.getWarehouse = async (req, res, next) => {
    try {
        var warehouse = await Warehouse.findOne({ _id: req.params.id });
        if (!warehouse) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Warehouse does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                warehouse
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