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
    toJSON: { virtuals: true }, toObject: { virtuals: true },
    timestamps: true
})

inventoryAdjustmentSchema.virtual("User", {
    ref: "User",
    foreignField: "_id", //referencing -> populate
    localField: "adminId", //referencing -> populate
    justOne: true // to remove array
});

inventoryAdjustmentSchema.virtual("Inventory", {
    ref: "Inventory",
    foreignField: "_id", //referencing -> populate
    localField: "inventoryId", //referencing -> populate
    justOne: true // to remove array
});

inventoryAdjustmentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "Inventory",
    });
    next()
})

const InventoryAdjustment = new mongoose.model("InventoryAdjustment", inventoryAdjustmentSchema)
module.exports = InventoryAdjustment