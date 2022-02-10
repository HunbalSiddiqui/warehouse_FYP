const mongoose = require("mongoose")

const inwardGroupSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, "Quantity must be provided."]
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product must be provided."]
    },
    inwardId: {
        type: mongoose.Schema.ObjectId,
        ref: "Inward",
        required: [true, "Inward must be provided."]
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User must be provided."]
    }
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

inwardGroupSchema.virtual("Product", {
    ref: "Product",
    foreignField: "_id", //referencing -> populate
    localField: "productId", //referencing -> populate
    justOne: true, // to remove array
});

const InwardGroup = new mongoose.model("InwardGroup", inwardGroupSchema)

module.exports = InwardGroup