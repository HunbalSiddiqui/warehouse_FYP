const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    country: {
        type: String,
        required: [true, "City must have a country"]
    },
    name: {
        type: String,
        required: [true, "City must have a name."]
    },
    lat: {
        type: Number,
        required: [true, "City must have a latitude."]
    },
    lng: {
        type: Number,
        required: [true, "City must have a longitude."]
    },
}, {
    timestamps: true
})

const City = new mongoose.model("City", citySchema);

module.exports = City