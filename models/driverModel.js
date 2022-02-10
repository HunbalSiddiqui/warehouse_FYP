const mongoose = require("mongoose")

const driverSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Driver must have a defined user."]
    },
    vendorId: {
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
        required: [true, "Driver must have a defined vendor."]
    },
    name: {
        type: String,
        required: [true, "Driver must have a name."],
    },
    licenseNumber: {
        type: String,
        required: [true, "Driver must have a license number."],
        unique: true
    },
    cnicNumber: {
        type: String,
        required: [true, "Driver must have a cnic number."],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Driver must have a phone."]
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

driverSchema.virtual("Vendor", {
    ref: "Vendor",
    foreignField: "_id", //referencing -> populate
    localField: "vendorId", //referencing -> populate
    justOne: true, // to remove array
});

const Driver = new mongoose.model("Driver", driverSchema);

module.exports = Driver