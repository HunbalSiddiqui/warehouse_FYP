const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Warehouse must have a defined user."]
    },
    name: {
        type: String,
        required: [true, "Warehouse must have a name."]
    },
    address: {
        type: String,
        required: [true, "Warehouse must have an address."]
    },
    businessWarehouseCode: {
        type: String,
        required: [true, "Warehouse must have a code."]
    },
    city: {
        type: String,
        required: [true, "Warehouse city must be provided."]
    },
    isActive: {
        type: Boolean,
        required: [true],
        default: true
    }
}, {
    timestamps: true
})

const Warehouse = new mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse