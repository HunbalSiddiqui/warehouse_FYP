const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");


const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter)

module.exports = app;