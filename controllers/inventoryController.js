const inventoryModel = require("../models/inventoryModel");
const { isError } = require("../utils/helpers");
const { v4: uuidv4 } = require("uuid");

const getInventoryList = (_req, res) => {
  //   console.log("testing output 2");
  return res.status(200).json(inventoryModel.getInventoryList());
};

//J2W-22
const getInventoryById = (req, res) => {
  const inventoryId = req.params.inventoryId;

  const found = inventoryModel.findById(inventoryId);
  if (found) {
    return res.status(200).json(inventoryModel.getInventoryById(inventoryId));
  } else {
    return res.status(404).json({
      errorMessage: `Inventory with ID:${inventoryId} does not exist`,
    });
  }
};

//J2W-23
const getInventoryByWarehouse = (req, res) => {
  const warehouseId = req.params.warehouseId;
  const inventoryList = inventoryModel.getInventoryList();
  const filteredInventoryList = inventoryList.filter((inventory) => {
    if (inventory.warehouseID === warehouseId) {
      return inventory;
    }
  });
  if (filteredInventoryList.length === 0) {
    //error handling if no inv found
    return res
      .status(404)
      .json(`Could not find inventory for warehouse with ID: ${warehouseId}`);
  }
  res.status(200).json(filteredInventoryList);
};

//TODO: J2W-24
const addInventoryItem = (req, res) => {
  console.log(req.body);
  console.log("hello", req);
  let result = isError("inventory", req.body);

  if (!result) {
    let data = { id: uuidv4(), ...req.body };
    let inventoryList = inventoryModel.getInventoryList();
    inventoryList.splice(0, 0, data);
    inventoryModel.updateInventory(inventoryList);
    res.status(200).json(data);
  } else {
    res.status(400).json(result);
  }
};

//J2W-26
const deleteInventory = (req, res) => {
  const inventoryId = req.params.inventoryId;
  const inventoryList = inventoryModel.getInventoryList();
  let inventory = inventoryModel.getInventoryById(inventoryId);
  if (!inventory) {
    return res
      .status(400)
      .json(`Inventory item with id ${inventoryId} not found`);
  }
  // let inventory = inventoryModel.getInventoryById(inventoryId);

  let inventoryListUpdated = inventoryList.filter((item) => {
    if (item.id !== inventoryId) {
      return item;
    }
  });
  inventoryModel.updateInventory(inventoryListUpdated);
  return res.status(200).json(inventory);
};

module.exports = {
  getInventoryList,
  getInventoryById,
  getInventoryByWarehouse,
  deleteInventory,
  addInventoryItem,
};
