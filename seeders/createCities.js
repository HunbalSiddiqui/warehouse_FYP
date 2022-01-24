require("dotenv").config();

const mongoose = require("mongoose");
const City = require("../models/cityModel");
const cities = require("../data/cities.json")

const DB = `mongodb+srv://root:root@cluster0.ui4yz.mongodb.net/fyp?retryWrites=true&w=majority`

mongoose.connect(DB, {
    useNewURLParser: true,
    useUnifiedTopology: true
})
    .then((connection) => {
        console.log("Connected with DB and now sending request for creating cities.");
        createCities()
    })
    .catch((err) => {
        console.log(err)
        console.log("DB not connected.")
    })

async function createCities() {
    try {
        await City.insertMany(cities)
        console.log("Cities created successfully...")
    } catch (error) {
        console.log(error)
        console.log("Cities could not be created.")
    }
}