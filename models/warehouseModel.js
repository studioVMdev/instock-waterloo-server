const { v4: uuidv4 } = require("uuid");
const { readFile, writeFile } = require("../utils/helpers");
const path = require("path");

const warehouseJSONPath = path.join(__dirname, "../data/warehouses.json");
// const warehouseList = readFile(warehouseJSONPath);
class Warehouse {
  constructor() {}

  //! TODO RESET WAREHOUSES METHOD
  //! TODO RESET INVENTORIES METHOD

  static getWarehousesList = () => {
    const warehouseList = readFile(warehouseJSONPath);
    return warehouseList;
  };

  //J2W-11
  static findById = (warehouseId) => {
    const warehouseList = readFile(warehouseJSONPath);
    return warehouseList.some((warehouse) => warehouse.id === warehouseId);
  };
  //J2W-11
  static getWarehouseById = (warehouseId) => {
    const warehouseList = readFile(warehouseJSONPath);
    return warehouseList.find((warehouse) => warehouse.id === warehouseId);
  };

  //J2W-12
  //J2W-14
  //J2W-15
  static updateWarehouse = (updateWarehouseList) => {
    //Warehouse list updated with given data
    writeFile(warehouseJSONPath, updateWarehouseList);
  };
}

module.exports = Warehouse;
