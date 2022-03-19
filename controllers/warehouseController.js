const warehouseModel = require("../models/warehouseModel");
const inventoryModel = require("../models/inventoryModel");
const { isError } = require("../utils/helpers");
const { v4: uuidv4 } = require("uuid");

const getWarehousesList = (_req, res) => {
  return res.status(200).json(warehouseModel.getWarehousesList());
};

//J2W-11
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

//J2W-12
const addWarehouse = (req, res) => {
  let result = isError("warehouse", req.body);
  if (!result) {
    let data = { id: uuidv4(), ...req.body };
    let warehouses = warehouseModel.getWarehousesList();
    warehouses.splice(0, 0, data);
    warehouseModel.updateWarehouse(warehouses);
    res.status(200).json(data);
  } else {
    res.status(400).json(result);
  }
};

//TODO: J2W-14
// const editWarehouse = (req, res) => {
//   let warehouseDetails = isError("warehouse details", req.body);

//   if (!warehouseDetails) {
//     const warehouseId = req.params.warehouseId;
//     let data = { warehouseId, ...req.body };
//     let warehouse = warehouseModel.getWarehouseById(warehouseId);
//     warehouseModel.updateWarehouseDetails(warehouse);
//     res.status(200).json(data);
//   } else {
//     res.status(400).json(warehouseDetails);
//   }
// };

//J2W-15
const deleteWarehouse = (req, res) => {
  console.log("deleted");
  const warehouseId = req.params.warehouseId;
  let warehouses = warehouseModel.getWarehousesList();
  //delete selected warehouse here
  if (!warehouseModel.getWarehouseById(warehouseId)) {
    return res.status(400).json(`warehouse with id ${warehouseId} not found`);
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
  addWarehouse,
  editWarehouse,
};
