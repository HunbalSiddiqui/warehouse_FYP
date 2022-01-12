const mongoose = require("mongoose")

const outwardGroupSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "OutwardGroup must have a defined user."]
    },
    inventoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Inventory",
        required: [true, "OutwardGroup must have a defined/valid inventory."]
    },
    outwardId: {
        type: mongoose.Schema.ObjectId,
        ref: "DispatchOrder",
        required: [true, "OutwardGroup must have a defined/valid DispatchOrder."]
    },
    quantity: {
        type: Number,
        required: [true, "OutwardGroup must have quantity."]
    },
}, {
    timestamps: true
})

const OutwardGroup = new mongoose.model("OutwardGroup", outwardGroupSchema)
module.exports = OutwardGroup