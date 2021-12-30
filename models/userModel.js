const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
        required: [true, "User must have a defined role."]
    },
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: [true, "User must have a username."],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "User must have a phone number."]
    },
    password: String,
    email: {
        type: String,
        required: [true, "User must have an email."],
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

//model instance method -> this method will be available for all the documents created by this model
userSchema.methods.passwordVerification = async (password, hasedPassword) => {
    return await bcrypt.compare(password, hasedPassword);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") && !this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000
    next();
})

userSchema.pre("save", async function (next) {
    //this -> document
    if (!this.isModified("password")) return next();
    var encryptedPassword = await bcrypt.hash(this.password, 12); //number brute force attack
    this.password = encryptedPassword;
    this.passwordConfirm = undefined;
    next();
})


const User = new mongoose.model("User", userSchema);

module.exports = User