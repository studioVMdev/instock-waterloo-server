const router = require("express").Router();

const inventoryController = require("../controllers/inventoryController");

//! SORT WILL HAPPEN on GET route using params e.g.
// /inventory ? sort_cat=category & sort=asc

//GET("/")
// TaskBack-End: API to GET List of all Inventory Items
// J2W-21Medium-
router.get("/", inventoryController.getInventoryList);

//GET("/:iId")
// TaskBack-End: API to GET a Single Inventory Item
//TODO: J2W-22Medium-
router.get("/:inventoryId", inventoryController.getInventoryById);
//GET("/warehouse/:wId")
// TaskBack-End: API to GET Inventories for a Given Warehouse
// J2W-23Medium-
router.get(
  "/warehouse/:warehouseId",
  inventoryController.getInventoryByWarehouse
);

//POST("/")
// TaskBack-End: API to POST/CREATE a New Inventory Item
// J2W-24Medium-

//POST("/:iId")
// TaskBack-End: API to PUT/PATCH/EDIT an Inventory Item
// J2W-25Medium

//DELETE("/:iId")
// TaskBack-End: API to DELETE an Inventory Item
// J2W-26
router.delete("/:inventoryId", inventoryController.deleteInventory);

module.exports = router;
