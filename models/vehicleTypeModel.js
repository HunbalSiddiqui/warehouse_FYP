const mongoose = require("mongoose");

const vehicleTypeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Vehicle Type must have a defined user."]
    },
    name: {
        type: String,
        required: [true, "Vehicle Type must have a name."],
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

const VehicleType = new mongoose.model("VehicleType", vehicleTypeSchema);

module.exports = VehicleType