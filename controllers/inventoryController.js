const inventoryModel = require("../models/inventoryModel");
const { v4: uuidv4 } = require("uuid");

const getInventoryList = (_req, res) => {
  return res.status(200).json(inventoryModel.getInventoryList());
};

module.exports = {
  getInventoryList,
};
