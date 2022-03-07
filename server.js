require("dotenv").config();
const app = require('./app');
const mongoose = require("mongoose");

const DB = process.env.MONGO_STRING.replace(
    "<PASSWORD>",
    process.env.MONGO_PASSWORD
);

mongoose.connect(DB, {
    useNewURLParser: true,
    useUnifiedTopology: true
})
    .then((connection) => {
        console.log("Connected with DB.");
    })
    .catch((err) => {
        console.log(err)
        console.log("DB not connected.")
    })

app.listen(process.env.PORT, () => {
    console.log("Server is running at port " + process.env.PORT || 8000)
})