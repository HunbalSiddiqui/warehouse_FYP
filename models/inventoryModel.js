const mongoose = require("mongoose")

const inventorySchema = mongoose.Schema({
    availableQuantity: {
        type: Number,
    },
    totalInwardQuantity: {
        type: Number,
    },
    totalCommitedQuantity: {
        type: Number,
        default: 0
    },
    totalDispatchedQuantity: {
        type: Number,
        default: 0
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
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

inventorySchema.virtual("Warehouse", {
    ref: "Warehouse",
    foreignField: "_id", //referencing -> populate
    localField: "warehouseId", //referencing -> populate
    justOne: true // to remove array
});

inventorySchema.virtual("Company", {
    ref: "Company",
    foreignField: "_id", //referencing -> populate
    localField: "companyId", //referencing -> populate
    justOne: true // to remove array
});

inventorySchema.virtual("Product", {
    ref: "Product",
    foreignField: "_id", //referencing -> populate
    localField: "productId", //referencing -> populate
    justOne: true // to remove array
});

inventorySchema.pre(/^find/, function (next) {
    //query middleware
    //this -> query
    this.populate({
        path: "Product",
        select: "name",
        populate: [{
            path: 'uomId',
            model: 'Uom',
            select: "name",
        }]
    });
    this.populate({
        path: "Warehouse",
        select: "name",
    });
    this.populate({
        path: "Company",
        select: "name",
    });
    next();
});

inventorySchema.pre(/^findOne/, function (next) {
    //query middleware
    //this -> query
    this.populate({
        path: "Warehouse",
        select: "_id name"
    });
    this.populate({
        path: "Product",
        select: "_id name categoryId brandId uomId",
        populate: [{
            path: 'categoryId',
            model: 'Category',
            select: "name"
        }, {
            path: 'brandId',
            model: 'Brand',
            select: "name"
        }, {
            path: 'uomId',
            model: 'Uom',
            select: "name"
        }]

    });
    this.populate({
        path: "Company",
        select: "_id name",
    });
    next();
});

const Inventory = new mongoose.model("Inventory", inventorySchema)

module.exports = Inventory