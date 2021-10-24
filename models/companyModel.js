const mongoose = require("mongoose")

const companySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: [true, "Company must have a defined user."]
    },
    internalIdForBusiness: {
        type: String,
        required: [true, "Company must have an id."]
    },
    type: {
        type: String,
        required: [true, "Company must have a type."]
    },
    name: {
        type: String,
        required: [true, "Company must have a name."]
    },
    phone: {
        type: String,
        required: [true, "Company must have a phone."]
    },
    notes: {
        type: String,
    },
    isActive: {
        type: Boolean,
        required
    }
}, {
    timestamps: true
})

const Company = new mongoose.model("Company", companySchema);

module.exports = Company