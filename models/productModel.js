const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Product must have a defined user."]
    },
    name: {
        type: String,
        required: [true, "Product must have a name."]
    },
    description: {
        type: String,
        required: [true, "Product must have a description."]
    },
    volume: {
        type: Number,
        required: [true, "Product must have a volume."]
    },
    weight: {
        type: Number,
        required: [true, "Product must have a weight."]
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Product must have a defined category."]
    },
    brandId: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
        required: [true, "Product must have a defined brand."]
    },
    uomId: {
        type: mongoose.Schema.ObjectId,
        ref: "Uom",
        required: [true, "Product must have a defined uom."]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Product = new mongoose.model("Product", productSchema);

module.exports = Product