const { v4: uuidv4 } = require("uuid");
const { readFile, writeFile } = require("../utils/helpers");
const path = require("path");

const inventoryJSONPath = path.join(__dirname, "../data/inventories.json");
const inventoryList = readFile(inventoryJSONPath);

class Inventory {
  constructor() {}

  //! TODO RESET WAREHOUSES METHOD
  //! TODO RESET INVENTORIES METHOD

  static getInventoryList = () => {
    console.log("inventory model");
    return inventoryList;
  };

  //J2W-25
  static updateInventory = (updateInventoryList) => {
    //Inventory list updated with given data
    writeFile(inventoryJSONPath, updateInventoryList);
  };

  //J2W-22
  static findById = (inventoryId) => {
    return inventoryList.some((inventory) => inventory.id === inventoryId);
  };
  //J2W-22
  static getInventoryById = (inventoryId) => {
    return inventoryList.find((inventory) => inventory.id === inventoryId);
  };
}

module.exports = Inventory;
