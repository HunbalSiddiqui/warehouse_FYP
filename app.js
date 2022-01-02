const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const companyRouter = require("./routes/companyRoute");
const warehouseRouter = require("./routes/warehouseRoute")
const brandRouter = require("./routes/brandRoute")

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/companies", companyRouter)
app.use("/api/v1/warehouses", warehouseRouter)
app.use("/api/v1/brands", brandRouter)

module.exports = app;