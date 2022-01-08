const mongoose = require("mongoose")
const { DISPATCH_ORDER_STATUS } = require("../enums/dispatchOrderStatus")

const dispatchOrderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Order must have a defined user."]
    },
    // inventoryId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Inventory",
    //     required: [true, "Order must have a defined/valid inventory."]
    // },
    internalIdForBusiness: {
        type: String,
        required: [true, "Order must have an id."],
        unique: true
    },
    quantity: {
        type: Number,
        required: [true, "Order must have quantity."]
    },
    receiverName: {
        type: String
    },
    receiverPhone: {
        type: Number
    },
    shipmentDate: {
        type: String
    },
    referenceId: {
        type: String
    },
    status: {
        type: Number,
        required: [true, "Order status must be provided."],
        default: DISPATCH_ORDER_STATUS.PENDING
    }

}, {
    timestamps: true
})

const DispatchOrder = new mongoose.model("DispatchOrder", dispatchOrderSchema)
module.exports = DispatchOrder