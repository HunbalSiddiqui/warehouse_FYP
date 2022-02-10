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
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

productInwardSchema.virtual("User", {
    ref: "User",
    foreignField: "_id", //referencing -> populate
    localField: "userId", //referencing -> populate
    justOne: true, // to remove array
});

productInwardSchema.virtual("Company", {
    ref: "Company",
    foreignField: "_id", //referencing -> populate
    localField: "companyId", //referencing -> populate
    justOne: true, // to remove array
});

productInwardSchema.virtual("Warehouse", {
    ref: "Warehouse",
    foreignField: "_id", //referencing -> populate
    localField: "warehouseId", //referencing -> populate
    justOne: true, // to remove array
});


const ProductInward = new mongoose.model("ProductInward", productInwardSchema)

module.exports = ProductInward