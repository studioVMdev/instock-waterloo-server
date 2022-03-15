const express = require("express");
// const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const app = express();
const cors = require("cors");

//! Middleware Start
app.use(express.static("public"));
app.use(express.json()); //bodyparser
app.use(cors()); //Enable CORS
//! Middleware End

app.get("/", (_req, res) => res.send("hello world"));
//TODO: Add a reset PATH that replaces json data with backup data

//! Routes
const warehouseRoutes = require("./routes/warehouseRoutes");
app.use("/warehouse", warehouseRoutes);

const inventoryRoutes = require("./routes/inventoryRoutes");
app.use("/inventory", inventoryRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log("listening on port " + (process.env.PORT || 8080));
});
