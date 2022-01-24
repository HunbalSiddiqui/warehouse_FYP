const mongoose = require("mongoose");
const { RIDE_STATUS } = require("../enums/dispatchOrderStatus")

const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Ride must have a defined user."]
    },
    companyId: {
        type: mongoose.Schema.ObjectId,
        ref: "Company",
        required: [true, "Ride must have a defined company."]
    },
    driverId: {
        type: mongoose.Schema.ObjectId,
        ref: "Driver",
        required: [true, "Ride must have a driver."]
    },
    vehicleId: {
        type: mongoose.Schema.ObjectId,
        ref: "Vehicle",
        required: [true, "Ride must have a driver."]
    },
    pickupCityId: {
        type: mongoose.Schema.ObjectId,
        ref: "City",
        required: [true, "Ride must have a pickup city."]
    },
    dropoffCityId: {
        type: mongoose.Schema.ObjectId,
        ref: "City",
        required: [true, "Ride must have a dropoff city."]
    },
    // status: {
    //     type: String,
    //     required: [true, "Ride must have a defined status."],
    //     defualt: RIDE_STATUS.SCHEDULED
    // },
    price: {
        type: Number,
        required: [true, "Ride must have price."]
    },
    cost: {
        type: Number,
        required: [true, "Ride must have cost."]
    },
},
    { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

rideSchema.virtual("User", {
    ref: "User",
    foreignField: "_id", //referencing -> populate
    localField: "userId", //referencing -> populate
    justOne: true // to remove array
});
rideSchema.virtual("Company", {
    ref: "Company",
    foreignField: "_id", //referencing -> populate
    localField: "companyId", //referencing -> populate
    justOne: true // to remove array
});
rideSchema.virtual("Vehicle", {
    ref: "Vehicle",
    foreignField: "_id", //referencing -> populate
    localField: "vehicleId", //referencing -> populate
    justOne: true // to remove array
});
rideSchema.virtual("Driver", {
    ref: "Driver",
    foreignField: "_id", //referencing -> populate
    localField: "driverId", //referencing -> populate
    justOne: true // to remove array
});
rideSchema.virtual("PickupCity", {
    ref: "City",
    foreignField: "_id", //referencing -> populate
    localField: "pickupCityId", //referencing -> populate
    justOne: true // to remove array
});
rideSchema.virtual("DropoffCity", {
    ref: "City",
    foreignField: "_id", //referencing -> populate
    localField: "dropoffCityId", //referencing -> populate
    justOne: true // to remove array
});

rideSchema.pre(/^find/, function (next) {
    //query middleware
    //this -> query
    this.populate({
        path: "User",
        select: "firstName lastName",
    });
    this.populate({
        path: "Company",
        select: "name",
    });
    this.populate({
        path: "Vehicle",
        select: "name",
    });
    this.populate({
        path: "Driver",
        select: "name",
    });
    this.populate({
        path: "PickupCity",
        select: "lat lng name"
    });
    this.populate({
        path: "DropoffCity",
        select: "lat lng name"
    });
    next();
});


const Ride = new mongoose.model("Ride", rideSchema);

module.exports = Ride