const mongoose = require("mongoose")

const inventoryAdjustmentSchema = mongoose.Schema({
    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "This user can not create inventory adjustment."]
    },
    inventoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Inventory",
        required: [true, "Inventory not provided for adjustment."]
    },
    adjustmentQuantity: {
        type: Number,
        required: [true, "Adjustment quantity must be provided."]
    },
    comment: {
        type: String,
    },
}, {
    timestamps: true
})

const InventoryAdjustment = new mongoose.model("InventoryAdjustment", inventoryAdjustmentSchema)
module.exports = InventoryAdjustment