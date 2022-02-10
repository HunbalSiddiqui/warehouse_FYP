const { json } = require("body-parser");
const conn = require("../models");
const Company = require("../models/companyModel");
const DispatchOrder = require("../models/dispatchOrderModel");
const Inventory = require("../models/inventoryModel");
const OrderGroup = require("../models/orderGroup");
const Product = require("../models/productModel");
const Warehouse = require("../models/warehouseModel");

exports.createDispatchOrder = async (req, res, next) => {
    const session = await conn.startSession();
    session.startTransaction();

    let dispatchOrder = {}
    req.body.inventories = req.body.inventories.filter((inv) => {
        if (inv.quantity > 0) return inv;
    });

    try {
        // 1- Set internalId
        const query = DispatchOrder.find()
        const count = await query.count()
        req.body.internalIdForBusiness = `DO-${count}`
        // 2 - get total sum of quantities
        let sumOfComitted = [];
        let comittedAcc;
        for (let Inventory of req.body.inventories) {
            let quantity = parseInt(Inventory.quantity);
            sumOfComitted.push(quantity);
        }
        comittedAcc = sumOfComitted.reduce((acc, po) => {
            return acc + po;
        });
        req.body.quantity = comittedAcc;
        // 3 - create dispatch order
        dispatchOrder = await DispatchOrder.create([{
            ...req.body
        }], { session: session })
        // 4 - filter duplicate inventories before creating order group
        let inventoryIds = [];
        inventoryIds = req.body.inventories.map((inventory) => {
            return inventory.id;
        });
        const toFindDuplicates = (arry) => arry.filter((item, index) => arry.indexOf(item) != index);
        const duplicateElements = toFindDuplicates(inventoryIds);
        if (duplicateElements.length != 0) {
            res.status(404).json({
                status: "error",
                success: false,
                error: "Can not add same inventory twice.",
            });
        }
        // 5 - create order group
        const orderGroups = await OrderGroup.insertMany(
            req.body.inventories.map((product) => ({
                userId: req.body.user.id,
                orderId: dispatchOrder[0].id,
                inventoryId: product.id,
                quantity: product.quantity
            }))
            , { session: session }
        )
        // 6 - update inventory quantities
        const updatedInventories = await Promise.all(
            req.body.inventories.map((_inventory) => {
                return Inventory.findOne({ _id: _inventory.id }, null, { session: session })
                    .then((inventory) => {
                        if (!inventory && !_inventory.id) throw new Error("Inventory is not available");
                        if (_inventory.quantity > inventory.availableQuantity)
                            throw new Error("Cannot create orders above available quantity");
                        try {
                            inventory.totalCommittedQuantity += +_inventory.quantity;
                            inventory.availableQuantity -= +_inventory.quantity;
                            return inventory.save();
                        } catch (err) {
                            res.status(404).json({
                                status: "error",
                                success: false,
                                error: error.message,
                            });
                        }
                    });
            })
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                dispatchOrder,
                orderGroups,
                updatedInventories
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

exports.getDispatchOrders = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        let dispatchOrders = await DispatchOrder.find().skip(skip).limit(limit);;
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await DispatchOrder.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
            data: {
                dispatchOrders
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

exports.getDispatchOrder = async (req, res, next) => {
    try {
        let dispatchOrder = await DispatchOrder.findOne({ _id: req.params.id })
            .populate({
                path: 'userId',
                select: "firstName lastName"
            }).select("-quantity");

        if (!dispatchOrder) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Dispatch Order not found.",
            });
        }
        let orderGroups = await OrderGroup.find({
            orderId: dispatchOrder.id
        }).populate({
            path: 'Inventory',
        })
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                orderGroups,
                dispatchOrder
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

exports.getDispatchOrderRelations = async (req, res, next) => {
    try {
        var companies = await Company.find();

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
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

exports.getWarehouses = async (req, res, next) => {
    try {
        if (req.params.companyId) {
            let where = {
                companyId: req.params.companyId
            }
            let inventories = await Inventory.find(where);

            return res.status(200).json({
                success: true,
                status: "success",
                count: inventories.length,
                data: {
                    warehouses: inventories.map((inventory) => inventory.Warehouse)
                },
            });
        }
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        if (req.params.companyId && req.params.warehouseId) {
            let where = {
                companyId: req.params.companyId,
                warehouseId: req.params.warehouseId
            }
            let inventories = await Inventory.find(where);

            return res.status(200).json({
                success: true,
                status: "success",
                count: inventories.length,
                data: {
                    products: inventories.map((inventory) => inventory.Product)
                },
            });
        }
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.getInventory = async (req, res, next) => {
    try {
        if (req.params.companyId && req.params.warehouseId && req.params.productId) {
            let where = {
                companyId: req.params.companyId,
                warehouseId: req.params.warehouseId,
                productId: req.params.productId
            }
            let inventory = await Inventory.findOne(where).select(["-Product", "-Company", "-Warehouse"]);
            inventory.Warehouse = null;
            inventory.Company = null;
            inventory.Product = null;
            if (!inventory) {
                return res.status(200).json({
                    success: true,
                    status: "data not found",
                    count: 0,
                    data: {
                        inventory: null
                    },
                });
            }
            return res.status(200).json({
                success: true,
                status: "success",
                count: 1,
                data: {
                    inventory
                },
            });
        }
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}