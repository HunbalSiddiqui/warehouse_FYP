const conn = require("../models");
const Company = require("../models/companyModel");
const Inventory = require("../models/inventoryModel");
const InwardGroup = require("../models/inwardGroupModel");
const ProductInward = require("../models/productInwardModel");
const Product = require("../models/productModel");
const Warehouse = require("../models/warehouseModel");

exports.createProductIward = async (req, res, next) => {
    const session = await conn.startSession();
    session.startTransaction();
    try {
        // 1 - create product inward
        const query = ProductInward.find()
        const count = await query.count()
        req.body.internalIdForBusiness = `PI-${count}`
        const productInward = await ProductInward.create([{
            ...req.body
        }], { session: session })

        // 2 - create inward group
        const inwardGroups = await InwardGroup.insertMany(
            req.body.products.map((product) => ({
                userId: req.body.user.id,
                inwardId: productInward[0].id,
                productId: product.id,
                quantity: product.quantity
            }))
            , { session: session }
        )
        // 3 - create/update inventory
        var inventories = [];
        for (let product of req.body.products) {
            let inventory = await Inventory.findOne({
                companyId: req.body.companyId,
                warehouseId: req.body.warehouseId,
                productId: product.id
            })
            //IF inventory is not created than create inventory ELSE update existing inventory
            if (!inventory) {
                inventory = await Inventory.create([
                    {
                        companyId: req.body.companyId,
                        warehouseId: req.body.warehouseId,
                        productId: product.id,
                        availableQuantity: product.quantity,
                        referenceId: req.body.referenceId,
                        totalInwardQuantity: product.quantity,
                    }
                ], { session: session })
            }
            else {
                inventory.availableQuantity += +product.quantity;
                inventory.totalInwardQuantity += +product.quantity;
                await inventory.save()
            }
            inventories.push(inventory)
        }
        await session.commitTransaction();
        session.endSession();
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

exports.getInwardRelations = async (req, res, next) => {
    try {
        var warehouses = await Warehouse.find();
        // var products = await Product.find();
        var companies = await Company.find();

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                warehouses,
                // products,
                companies
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