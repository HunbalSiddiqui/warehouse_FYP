const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Vehicle must have a defined user."]
    },
    vehicleTypeId: {
        type: mongoose.Schema.ObjectId,
        ref: "VehicleType",
        required: [true, "Vehicle must have a vehicle type."]
    },
    vendorId: {
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
        required: [true, "Vehicle must have a vendor."]
    },
    driverId: {
        type: mongoose.Schema.ObjectId,
        ref: "Driver",
        required: [true, "Vehicle must have a driver."]
    },
    registrationNumber: {
        type: String,
        required: [true, "Vehicle must have a unique registration number."],
        unique: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

const Vehicle = new mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle