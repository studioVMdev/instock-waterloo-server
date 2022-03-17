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

const deleteWarehouse = (req, res) => {
  const warehouseId = req.params.warehouseId;
  let warehouses = warehouseModel.getWarehousesList();
  //delete selected warehouse here
  let warehousesList = warehouses.filter((warehouse) => {
    if (warehouse.id !== warehouseId) {
      return warehouse;
    }
  });
  warehouseModel.updateWarehouse(warehousesList);

  //delete inventory corresponding to
  if (req.query.option === "full") {
    //delete inv here!!
    let inventoryList = inventoryModel.getInventoryList();
    let inventoryUpdatedList = inventoryList.filter((inventory) => {
      if (inventory.warehouseID !== warehouseId) {
        return inventory;
      }
    });
    inventoryModel.updateInventory(inventoryUpdatedList);
    return res.status(200).json(inventoryUpdatedList);
  }

  return res.status(200).json(warehousesList);
};

module.exports = {
  getWarehousesList,
  getWarehouseById,
  deleteWarehouse,
};
