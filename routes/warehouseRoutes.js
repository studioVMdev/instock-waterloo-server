const router = require("express").Router();

const warehouseController = require("../controllers/warehouseController");

//! SORT WILL HAPPEN on GET route using params e.g.
// /warehouse ? sort_cat=category & sort=asc

//GET("/")
// TaskBack-End: API to GET List of All Warehouses
// J2W-10Medium-
router.get("/", warehouseController.getWarehousesList);

//GET("/:wId")
// TaskBack-End: API to GET a Single Warehouse
// J2W-11Medium-
router.get("/:warehouseId", warehouseController.getWarehouseById);

//POST("/")
// TaskBack-End: API to POST/CREATE a New Warehouse
// J2W-12Medium-

//PATCH("/:wId")
// TaskBack-End: API to PUT/PATCH/EDIT a Warehouse
// J2W-14Medium-

//DELETE("/:wId")
// TaskBack-End: API to DELETE a Warehouse
// J2W-15Medium
//use route with query paramter ?fulldelete=no to just the warehouse and not inventory
//example: /delete/:warehouseId?fulldelete=no
router.delete("/delete/:warehouseId", warehouseController.deleteWarehouse);

//Use the route below if the inventory list has to also be deleted alongside warehouse

module.exports = router;
