const inventoryModel = require("../models/inventoryModel");
const { v4: uuidv4 } = require("uuid");

const getInventoryList = (_req, res) => {
  //   console.log("testing output 2");
  return res.status(200).json(inventoryModel.getInventoryList());
};

module.exports = {
  getInventoryList,
};
