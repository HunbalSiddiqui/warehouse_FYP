const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Brand must have a defined user."]
    },
    name: {
        type: String,
        required: [true, "Brand must have a name."],
        unique: [true, "This brand already exist in the system."]
    },
    manufacturerName: {
        type: String,
        required: [true, "Brand must have a manufacturer name."]
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

const Brand = new mongoose.model("Brand", brandSchema);

module.exports = Brand