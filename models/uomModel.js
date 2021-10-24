const mongoose = require("mongoose");

const uomSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: [true, "Uom must have a defined user."]
    },
    name: {
        type: String,
        require: [true, "Uom must have a name."]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Uom = new mongoose.model("Uom", uomSchema);

module.exports = Uom