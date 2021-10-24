const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: [true, "Brand must have a defined user."]
    },
    name: {
        type: String,
        require: [true, "Brand must have a name."]
    },
    manufacturerName: {
        type: String,
        require: [true, "Brand must have a manufacturer name."]
    },
    isActive: {
        type: Boolean,
    }
}, {
    timestamps: true
})

const Brand = new mongoose.model("Brand", brandSchema);

module.exports = Brand