const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const companyRouter = require("./routes/companyRoute");
const warehouseRouter = require("./routes/warehouseRoute")
const brandRouter = require("./routes/brandRoute")
const uomRouter = require("./routes/uomRoute")
const categoryRouter = require("./routes/categoryRoute")
const productRouter = require("./routes/productRoute")
const productInwardRouter = require("./routes/productInwardRoute")
const inventoryRouter = require("./routes/inventoryRoute")
const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/companies", companyRouter)
app.use("/api/v1/warehouses", warehouseRouter)
app.use("/api/v1/brands", brandRouter)
app.use("/api/v1/uoms", uomRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/product-inwards", productInwardRouter)
app.use("/api/v1/inventories", inventoryRouter)
module.exports = app;