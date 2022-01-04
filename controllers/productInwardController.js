const Inventory = require("../models/inventoryModel");
const InwardGroup = require("../models/inwardGroupModel");
const ProductInward = require("../models/productInwardModel");

exports.createProductIward = async (req, res, next) => {
    try {
        // 1 - create product inward
        const query = ProductInward.find()
        const count = await query.count()
        req.body.internalIdForBusiness = `PI-${count}`
        const productInward = await ProductInward.create(req.body)
        // 2 - create inward group
        const inwardGroups = await InwardGroup.insertMany(
            req.body.products.map((product) => ({
                userId: req.body.user.id,
                inwardId: productInward.id,
                productId: product.id,
                quantity: product.quantity
            }))
        )
        // 3 - create/update inventory
        var inventories = [];
        for (let product of req.body.products) {
            let inventory = await Inventory.findOne({
                where: {
                    companyId: req.body.companyId,
                    warehouseId: req.body.warehouseId,
                    productId: product.id,
                }
            })
            //IF inventory is not created than create inventory ELSE update existing inventory
            if (!inventory) {
                inventory = await Inventory.create(
                    {
                        companyId: req.body.companyId,
                        warehouseId: req.body.warehouseId,
                        productId: product.id,
                        availableQuantity: product.quantity,
                        referenceId: req.body.referenceId,
                        totalInwardQuantity: product.quantity,
                    },
                )
            }
            else {
                inventory.availableQuantity += +product.quantity;
                inventory.totalInwardQuantity += +product.quantity;
                await inventory.save()
            }
            inventories.push(inventory)
        }

        // return 
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                productInward,
                inwardGroups,
                inventories
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

exports.getProductInwards = async (req, res, next) => {
    try {
        const productInwards = await ProductInward.find();
        if (!productInwards || !productInwards.length) {
            res.status(404).json({
                status: "error",
                success: false,
                error: "Product Inwards not found.",
            });
        }
        // return 
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                productInwards
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

exports.getProductInward = async (req, res, next) => {
    try {
        const productInward = await ProductInward.findOne({ _id: req.params.id });

        if (!productInward) {
            res.status(404).json({
                status: "error",
                success: false,
                error: "Product Inwards not found.",
            });
        }

        // return 
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                productInward
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