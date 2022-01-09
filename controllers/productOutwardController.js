const { DISPATCH_ORDER_STATUS } = require("../enums/dispatchOrderStatus");
const DispatchOrder = require("../models/dispatchOrderModel");
const conn = require("../models");
const ProductOutward = require("../models/productOutwardModel");
const OrderGroup = require("../models/orderGroup");
const Inventory = require("../models/inventoryModel");
const OutwardGroup = require("../models/outwardGroup");

exports.createProductOutward = async (req, res, next) => {
    const session = await conn.startSession();
    session.startTransaction();
    let productOutward = {}
    try {
        // 1 - fetch the dispatch order
        let dispatchOrder = await DispatchOrder.findOne({ _id: req.body.dispatchOrderId })
        if (!dispatchOrder) {
            return res.json({
                success: false,
                message: "No dispatch order found",
            });
        }
        // 2 - check if dispatch is already fullfilled
        if (dispatchOrder.status === DISPATCH_ORDER_STATUS.FULFILLED) {
            return res.json({
                success: false,
                message: "Dispatch Order is already fulfilled",
            });
        }
        // 3- Set internalId
        const query = ProductOutward.find()
        const count = await query.count()
        req.body.internalIdForBusiness = `PO-${count}`
        // 4 - get total sum of quantities
        let sumOfOutwards = [];
        let outwardAcc;
        for (let Inventory of req.body.inventories) {
            const orderGroup = await OrderGroup.findOne({ orderId: req.body.dispatchOrderId, inventoryId: Inventory.id })
            if (!orderGroup) {
                return res.json({
                    success: false,
                    message: "Cannot create outward having products other than ordered products",
                });
            }
            if (Inventory.quantity > orderGroup.quantity) {
                return res.json({
                    success: false,
                    message: "Outward quantity cant be greater than ordered quantity",
                });
            }
            let quantity = parseInt(Inventory.quantity);
            sumOfOutwards.push(quantity);
        }
        outwardAcc = sumOfOutwards.reduce((acc, po) => {
            return acc + po;
        });
        req.body.quantity = outwardAcc;
        // 5 - create product outward
        productOutward = await ProductOutward.create([{
            ...req.body
        }], { session: session })
        // 6 - create outward group
        const outwardGroups = await OutwardGroup.insertMany(
            req.body.inventories.map((inventory) => ({
                userId: req.body.user.id,
                outwardId: productOutward[0].id,
                inventoryId: inventory.id,
                quantity: inventory.quantity,
            })),
            { session: session }
        );
        // 7 - update dispatch order status
        const totalOrderedQuantity = dispatchOrder.quantity
        const totalDispatchedQuantity = outwardAcc
        if (totalDispatchedQuantity === totalOrderedQuantity) {
            dispatchOrder.status = DISPATCH_ORDER_STATUS.FULFILLED
        }
        else if (totalDispatchedQuantity < totalOrderedQuantity && totalDispatchedQuantity > 0) {
            dispatchOrder.status = DISPATCH_ORDER_STATUS.PARTIALLY_FULFILLED
        }
        await dispatchOrder.save({ session: session });
        // 8 - update inventory quantities
        const updatedInventories = await Promise.all(
            req.body.inventories.map((_inventory) => {
                return Inventory.findOne({ _id: _inventory.id }, null, { session: session })
                    .then((inventory) => {
                        if (!inventory && !_inventory.id) throw new Error("Inventory is not available");
                        if (_inventory.quantity > inventory.availableQuantity)
                            throw new Error("Cannot create orders above available quantity");
                        try {
                            inventory.totalDispatchedQuantity += +_inventory.quantity;
                            inventory.totalCommittedQuantity -= +_inventory.quantity;
                            return inventory.save({ session: session });
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
                productOutward,
                outwardGroups,
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