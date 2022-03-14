const warehouseModel = require("../models/warehouseModel");
const { v4: uuidv4 } = require("uuid");

const getWarehousesList = (_req, res) => {
	return res.status(200).json(warehouseModel.getWarehousesList());
};

module.exports = {
	getWarehousesList,
};
