const mongoose = require("mongoose");
const DispatchOrder = require("./dispatchOrderModel");

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
    toJSON: { virtuals: true }, toObject: { virtuals: true }
    ,
    timestamps: true
})

productOutwardSchema.virtual("DispatchOrder", {
    ref: "DispatchOrder",
    foreignField: "_id", //referencing -> populate
    localField: "dispatchOrderId", //referencing -> populate
});


productOutwardSchema.pre(/^find/, function (next) {
    //query middleware
    //this -> query
    this.populate({
        path: "DispatchOrder",
        select: "_id internalIdForBusiness status",
    });
    next()
})

const ProductOutward = new mongoose.model("ProductOutward", productOutwardSchema)

module.exports = ProductOutward