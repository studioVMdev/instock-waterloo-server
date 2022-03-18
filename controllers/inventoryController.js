const inventoryModel = require("../models/inventoryModel");
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

module.exports = {
  getInventoryList,
  getInventoryById,
};
