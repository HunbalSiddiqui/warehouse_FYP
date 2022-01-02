const mongoose = require("mongoose");

const uomSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Uom must have a defined user."]
    },
    name: {
        type: String,
        required: [true, "Uom must have a name."]
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

const Uom = new mongoose.model("Uom", uomSchema);

module.exports = Uom