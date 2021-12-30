require("dotenv").config();

const mongoose = require("mongoose");
const Role = require("../models/roleModel");

const DB = `mongodb+srv://root:root@cluster0.ui4yz.mongodb.net/fyp?retryWrites=true&w=majority`

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
        var initialRoleData = [{
            type: "SUPER_ADMIN",
            name: "Super Admin",
            allowedApps: "OPERATIONS"
        }, {
            type: "ADMIN",
            name: "Admin",
            allowedApps: "OPERATIONS"
        }, {
            type: "CUSTOMER_SUPER_ADMIN",
            name: "Customer Super Admin",
            allowedApps: "CUSTOMER"
        }]
        const role = await Role.insertMany(initialRoleData)
        console.log("Roles created successfully...")
    } catch (error) {
        console.log(error)
        console.log("Roles could not be created.")
    }
}
