const warehouseModel = require("../models/warehouseModel");
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

module.exports = {
  getWarehousesList,
  getWarehouseById,
};
