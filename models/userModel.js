const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
        require: [true, "User must have a defined role."]
    },
    // companyId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Company",
    // },
    firstName: String,
    lastName: String,
    username: {
        type: String,
        require: [true, "User must have a username."]
    },
    phone: {
        type: String,
        require: [true, "User must have a phone number."]
    },
    password: String,
    email: {
        type: String,
        require: [true, "User must have an email."]
    },
}, {
    timestamps: true
})

const User = new mongoose.model("User", userSchema);

module.exports = User