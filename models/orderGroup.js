const mongoose = require("mongoose")

const orderGroupSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "OrderGroup must have a defined user."]
    },
    inventoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Inventory",
        required: [true, "OrderGroup must have a defined/valid inventory."]
    },
    orderId: {
        type: mongoose.Schema.ObjectId,
        ref: "DispatchOrder",
        required: [true, "OrderGroup must have a defined/valid DispatchOrder."]
    },
    quantity: {
        type: Number,
        required: [true, "OrderGroup must have quantity."]
    },
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

orderGroupSchema.virtual("Inventory", {
    ref: "Inventory",
    foreignField: "_id", //referencing -> populate
    localField: "inventoryId", //referencing -> populate
    justOne: true // to remove array
})

const OrderGroup = new mongoose.model("OrderGroup", orderGroupSchema)
module.exports = OrderGroup