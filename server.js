const app = require('./app');
const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/testMongoDb";

mongoose.connect(DB, {
    useNewURLParser: true,
    useUnifiedTopology: true
})
    .then((connection) => {
        console.log("Connected with DB.");
    })
    .catch((err) => {
        console.log("DB not connected.")
    })

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})