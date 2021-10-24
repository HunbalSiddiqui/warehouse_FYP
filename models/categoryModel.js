const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: [true, "Category must have a defined user."]
    },
    name: {
        type: String,
        require: [true, "Category must have a name."]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category