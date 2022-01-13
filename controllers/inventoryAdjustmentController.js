const conn = require("../models");
const InventoryAdjustment = require("../models/inventoryAdjustmentModel");
const Inventory = require("../models/inventoryModel");
const Role = require("../models/roleModel");
const User = require("../models/userModel");

exports.createInventoryAdjustment = async (req, res, next) => {
    try {
        var inventories = []
        // validations
        for (let inv of req.body.inventories) {
            var adjustmentQuantity = inv.adjustmentQuantity
            var inventory = await Inventory.findOne({ _id: inv.inventoryId })
            if (!inventory) {
                return res.status(404).json({
                    status: "error",
                    success: false,
                    error: "Inventory does not exist.",
                });
            }
            if (inventory.availableQuantity < adjustmentQuantity) {
                return res.status(404).json({
                    status: "error",
                    success: false,
                    error: `Adjustment quantity of ${inventory.Product.name} is more than the available quantity.`,
                });
            }
            var user = await User.findOne({ _id: inv.adminId }).populate({
                path: "role",
                select: "type name allowedApps",
                model: Role
            })
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    success: false,
                    error: "User/Admin not provided.",
                });
            }
            if (user.role.type != process.env.MASTER_USER) {
                return res.status(404).json({
                    status: "error",
                    success: false,
                    error: "This user do not have the rights for adjustment.",
                });
            }
            inventories.push(inventory)
        }
        // adjustments
        for (let inv of req.body.inventories) {
            var adjustmentQuantity = inv.adjustmentQuantity
            var inventory = inventories.find((inven) => inven.id == inv.inventoryId)
            var adjustedQuantity = parseInt(inventory.availableQuantity) - parseInt(adjustmentQuantity)
            inventory.availableQuantity = adjustedQuantity
            inventory = await Inventory.findOneAndUpdate({ _id: inventory.id }, inventory, {
                new: true,
            });
        }

        const inventoryAdjustments = await InventoryAdjustment.insertMany(req.body.inventories)

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                inventoryAdjustments
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

exports.getInventoryAdjustments = async (req, res, next) => {
    try {
        const inventoryAdjustments = await InventoryAdjustment.find()

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                inventoryAdjustments
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

exports.getInventoryAdjustment = async (req, res, next) => {
    try {
        const inventoryAdjustment = await InventoryAdjustment.findOne({ _id: req.params.id })
        if (!inventoryAdjustment) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Inventory Adjustment does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                inventoryAdjustment
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

exports.deleteInventoryAdjustment = async (req, res, next) => {
    try {
        const session = await conn.startSession();
        session.startTransaction();

        var inventoryAdjustment = await InventoryAdjustment.findOne({ _id: req.params.id })
        if (!inventoryAdjustment) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Inventory Adjustment does not exist.",
            });
        }
        // find inventory
        var inventory = await Inventory.findOne({ _id: inventoryAdjustment.inventoryId })
        if (!inventory) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Inventory  does not exist.",
            });
        }
        var adjustedQuantity = parseInt(inventory.availableQuantity) + parseInt(inventoryAdjustment.adjustmentQuantity)
        inventory.availableQuantity = adjustedQuantity
        // update inventory
        inventory = await Inventory.findOneAndUpdate({ _id: inventory.id }, inventory, {
            new: true,
        }).session(session);

        inventoryAdjustment = await InventoryAdjustment.deleteOne({ _id: req.params.id }).session(session)

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                inventory
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}