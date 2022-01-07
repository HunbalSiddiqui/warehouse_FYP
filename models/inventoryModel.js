const mongoose = require("mongoose")

const inventorySchema = mongoose.Schema({
    availableQuantity: {
        type: Number,
        // required: [true, "Available quantity must be provided."]
    },
    totalInwardQuantity: {
        type: Number,
        // required: [true, "Total inward quantity must be provided."]
    },
    totalCommitedQuantity: {
        type: Number,
        // required: [true, "Total committed quantity must be provided."]
    },
    totalDispatchedQuantity: {
        type: Number,
        // required: [true, "Total dispatched quantity must be provided."]
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product must be provided."]
    },
    companyId: {
        type: mongoose.Schema.ObjectId,
        ref: "Company",
        required: [true, "Company must be provided."]
    },
    warehouseId: {
        type: mongoose.Schema.ObjectId,
        ref: "Warehouse",
        required: [true, "Warehouse must be provided."]
    },
}, {
    timestamps: true
})

const Inventory = new mongoose.model("Inventory", inventorySchema)

module.exports = Inventory