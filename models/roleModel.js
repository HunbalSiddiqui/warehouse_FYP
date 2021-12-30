const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    type: {
        type: String
    },
    name: {
        type: String
    },
    allowedApps: {
        type: String,
        enum: ['OPERATIONS', 'CUSTOMER'],
        default: 'OPERATIONS'
    }
}, {
    timestams: true
})


const Role = new mongoose.model("Role", roleSchema);

module.exports = Role