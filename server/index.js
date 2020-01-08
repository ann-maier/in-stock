const express = require("express");
const bodyParser = require("body-parser");

const cors = require("./middlewares/cors");
const db = require("./sequelize");

const warehousesRoutes = require("./routes/warehouses");
const productsRoutes = require("./routes/products");
const productsInStockRoutes = require("./routes/products-in-stock");

const app = express();
const server = app.listen(8000);

app.use(cors);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use("/warehouses", warehousesRoutes);
app.use("/products", productsRoutes);
app.use("/products-in-stock", productsInStockRoutes);
