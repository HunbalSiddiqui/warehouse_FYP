const mongoose = require("mongoose")

const productOutwardSchema = mongoose.Schema({
    // TODO: add vehicleId once vehicle is created in Logistics part
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Product Outward must have a defined user."]
    },
    dispatchOrderId: {
        type: mongoose.Schema.ObjectId,
        ref: "DispatchOrder",
        required: [true, "Product Outward must have a defined user."]
    },
    internalIdForBusiness: {
        type: String,
        required: [true, "Product Outward must have an id."],
        unique: true
    },
    quantity: {
        type: Number,
        required: [true, "Product Outward must have quantity."]
    },
    referenceId: {
        type: String
    },
    externalVehicle: {
        type: Boolean,
        required: [true, "Product Outward must have vehicle type."],
        default: false,
    },
}, {
    timestamps: true
})

const ProductOutward = new mongoose.model("ProductOutward", productOutwardSchema)

module.exports = ProductOutward