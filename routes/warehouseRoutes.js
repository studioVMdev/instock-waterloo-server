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

// //GET("/list")
// //TaskBack-End: API to get list of all warehouse names
// //J2W-35Medium-
// router.get("/list", warehouseController.getWarehouseNames);

//POST("/")
// TaskBack-End: API to POST/CREATE a New Warehouse
// J2W-12Medium-
//Needs data in JSON format
router.post("/add", warehouseController.addWarehouse);

//PATCH("/:wId")
// TaskBack-End: API to PUT/PATCH/EDIT a Warehouse
// J2W-14Medium-
router.put("/:warehouseId", warehouseController.editWarehouse);

//DELETE("/:wId")
// TaskBack-End: API to DELETE a Warehouse
// J2W-15Medium
//use route with query paramter ?fulldelete=no to just the warehouse and not inventory
//example: /delete/:warehouseId?fulldelete=no
router.delete("/:warehouseId", warehouseController.deleteWarehouse);

//Use the route below if the inventory list has to also be deleted alongside warehouse

module.exports = router;
