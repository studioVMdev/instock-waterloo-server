const warehouseModel = require("../models/warehouseModel");
const inventoryModel = require("../models/inventoryModel");
const { v4: uuidv4 } = require("uuid");

const getWarehousesList = (_req, res) => {
  return res.status(200).json(warehouseModel.getWarehousesList());
};

// TODO: J2W-11
const getWarehouseById = (req, res) => {
  const warehouseId = req.params.warehouseId;

  const found = warehouseModel.findById(warehouseId);
  if (found) {
    return res.status(200).json(warehouseModel.getWarehouseById(warehouseId));
  } else {
    return res.status(404).json({
      errorMessage: `Warehouse with ID:${warehouseId} does not exist`,
    });
  }
};

//J2W-15
const deleteWarehouse = (req, res) => {
  const warehouseId = req.params.warehouseId;
  let warehouses = warehouseModel.getWarehousesList();
  //delete selected warehouse here
  if (!warehouseModel.getWarehouseById(warehouseId)) {
    res.status(400).json("FAILED");
  }
  let warehouse = warehouseModel.getWarehouseById(warehouseId);

  let warehousesList = warehouses.filter((warehouse) => {
    if (warehouse.id !== warehouseId) {
      return warehouse;
    }
  });
  warehouseModel.updateWarehouse(warehousesList);

  //delete inventory corresponding to warehouseID

  if (req.query.fulldelete !== "no") {
    //this code does not run if the query parameter is no
    //by default it will delete the inventory with the warehouse
    let inventoryList = inventoryModel.getInventoryList();
    let inventoryUpdatedList = inventoryList.filter((inventory) => {
      if (inventory.warehouseID !== warehouseId) {
        return inventory;
      }
    });
    inventoryModel.updateInventory(inventoryUpdatedList);
    return res.status(200).json(warehouse);
  }

  return res.status(200).json(warehouse);
};

module.exports = {
  getWarehousesList,
  getWarehouseById,
  deleteWarehouse,
};
