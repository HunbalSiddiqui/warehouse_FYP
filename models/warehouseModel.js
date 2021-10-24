const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: [true, "Warehouse must have a defined user."]
    },
    name: {
        type: String,
        require: [true, "Warehouse must have a name."]
    },
    address: {
        type: String,
        require: [true, "Warehouse must have an address."]
    },
    businessWarehouseCode: {
        type: String,
    },
    city: {
        type: String
    },
    isActive: {
        type: Boolean,
    }
}, {
    timestamps: true
})

const Warehouse = new mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse