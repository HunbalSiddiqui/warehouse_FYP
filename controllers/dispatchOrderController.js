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
        limit = parseInt(limit) || 0;
        var skip = (page - 1) * limit;

        let dispatchOrders = await DispatchOrder.find().skip(skip).limit(limit);;
        if (limit > 0) {
            var totalPages = Math.ceil((await DispatchOrder.countDocuments()) / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
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
        let dispatchOrder = await DispatchOrder.findOne({ _id: req.params.id });

        if (!dispatchOrder) {
            res.status(404).json({
                status: "error",
                success: false,
                error: "Dispatch Order not found.",
            });
        }

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
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