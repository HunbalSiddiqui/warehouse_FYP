const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: [true, "Product must have a defined user."]
    },
    name: {
        type: String,
        require: [true, "Product must have a name."]
    },
    description: {
        type: String,
        require: [true, "Product must have a description."]
    },
    volume: {
        type: Number,
        require: [true, "Product must have a volume."]
    },
    weight: {
        type: Number,
        require: [true, "Product must have a weight."]
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        require: [true, "Product must have a defined category."]
    },
    brandId: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
        require: [true, "Product must have a defined brand."]
    },
    uomId: {
        type: mongoose.Schema.ObjectId,
        ref: "Uom",
        require: [true, "Product must have a defined uom."]
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