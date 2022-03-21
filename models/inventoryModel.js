const { v4: uuidv4 } = require("uuid");
const { readFile, writeFile } = require("../utils/helpers");
const path = require("path");

const inventoryJSONPath = path.join(__dirname, "../data/inventories.json");

class Inventory {
  constructor() {}

  //! TODO RESET WAREHOUSES METHOD
  //! TODO RESET INVENTORIES METHOD

  static getInventoryList = () => {
    const inventoryList = readFile(inventoryJSONPath);
    return inventoryList;
  };

  //J2W-24
  //J2W-25
  static updateInventory = (updateInventoryList) => {
    //Inventory list updated with given data
    writeFile(inventoryJSONPath, updateInventoryList);
  };

  //J2W-22
  static findById = (inventoryId) => {
    const inventoryList = readFile(inventoryJSONPath);
    return inventoryList.some((inventory) => inventory.id === inventoryId);
  };
  //J2W-22
  static getInventoryById = (inventoryId) => {
    const inventoryList = readFile(inventoryJSONPath);
    return inventoryList.find((inventory) => inventory.id === inventoryId);
  };
}

module.exports = Inventory;
