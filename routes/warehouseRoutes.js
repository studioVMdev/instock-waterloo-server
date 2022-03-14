const router = require("express").Router();

const warehouseController = require("../controllers/warehouseController");


router.get("/",warehouseController.getWarehousesList);


module.exports = router;