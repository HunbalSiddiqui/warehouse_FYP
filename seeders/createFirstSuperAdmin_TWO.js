require("dotenv").config();

const mongoose = require("mongoose");
const Role = require("../models/roleModel");
const User = require("../models/userModel");

const DB = `mongodb+srv://root:Mw3NVh0mRmloWS8U@cluster0.ui4yz.mongodb.net/fyp?retryWrites=true&w=majority`

mongoose.connect(DB, {
    useNewURLParser: true,
    useUnifiedTopology: true
})
    .then((connection) => {
        console.log("Connected with DB and now sending request for creating user roles.");
        createUserRoles()
    })
    .catch((err) => {
        console.log(err)
        console.log("DB not connected.")
    })


async function createUserRoles() {
    try {
        var initialRoleData = {
            firstName: "test",
            lastName: "user two",
            username: "admin",
            email: "admin@yopmail.com",
            phone: "+923412262270",
            password: "123456",
            role: "61cdf2435eafa6514b25cd2e"
        }
        const user = await User.create(initialRoleData)
        console.log("User created successfully...")
    } catch (error) {
        console.log(error.message)
        console.log("User could not be created.")
    }
}
