const mongoose = require("mongoose")

const productInwardSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Company must have a defined user."]
    },
    internalIdForBusiness: {
        type: String,
        required: [true, "Company must have an id."],
        unique: true
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
    referenceId: {
        type: String,
    },
    vehicleType: {
        type: String,
    },
    vehicleName: {
        type: String,
    },
    vehicleNumber: {
        type: String,
    },
    driverName: {
        type: String,
    },
}, {
    timestamps: true
})

const ProductInward = new mongoose.model("ProductInward", productInwardSchema)

module.exports = ProductInward