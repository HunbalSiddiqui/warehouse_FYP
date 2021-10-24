const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(express.json());


module.exports = app;