const warehouseModel = require("../models/warehouseModel");
const { v4: uuidv4 } = require("uuid");

const getWarehousesList = (_req, res) => {
  return res.status(200).json(warehouseModel.getWarehousesList());
};

//J2W-11
const getWarehouseById = (req, res) => {
  const warehousesList = warehouseModel.getWarehousesList();
  const selectedWarehouse = warehousesList.find(
    (warehouse) => warehouse.id == req.params.warehouseId
  );
  return res.status(200).json(selectedWarehouse);
};

module.exports = {
  getWarehousesList,
  getWarehouseById,
};
