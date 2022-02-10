const mongoose = require("mongoose")

const vendorSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Vendor must have a defined user."]
    },
    internalIdForBusiness: {
        type: String,
        required: [true, "Vendor must have an id."],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Vendor must have a name."],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Vendor must have a phone."]
    },
    notes: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

vendorSchema.virtual("User", {
    ref: "User",
    foreignField: "_id", //referencing -> populate
    localField: "userId", //referencing -> populate
    justOne: true, // to remove array
});

const Vendor = new mongoose.model("Vendor", vendorSchema);

module.exports = Vendor