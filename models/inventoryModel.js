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
}

module.exports = Inventory;
