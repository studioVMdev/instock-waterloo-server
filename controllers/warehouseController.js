const warehouseModel = require("../models/warehouseModel");
const inventoryModel = require("../models/inventoryModel");
const { isError } = require("../utils/helpers");
const { v4: uuidv4 } = require("uuid");

const getWarehousesList = (req, res) => {
  const fullWarehouseList = warehouseModel.getWarehousesList();
  if (req.query.data) {
    //if user wants specific data about all warehouses it can be sorted here
    const sortWarehouse = fullWarehouseList.map((warehouse) => {
      //this maps the data user requested for
      if (warehouse[req.query.data]) {
        //it only maps if the key user gives is found in the warehouse info
        return { value: warehouse[req.query.data] };
      } else {
        //if key not found gives error
        res
          .status(404)
          .json(`Warehouses do not have data on "${req.query.data}"`);
      }
    });
    return res.status(200).json(sortWarehouse); //the result of the map returned here
  }
  return res.status(200).json(fullWarehouseList); //this code is only reached if user does not provide query
};

//J2W-11
const getWarehouseById = (req, res) => {
  const warehouseId = req.params.warehouseId;

  const found = warehouseModel.findById(warehouseId);
  if (found) {
    return res.status(200).json(warehouseModel.getWarehouseById(warehouseId));
  } else {
    return res.status(404).json({
      errorMessage: `Warehouse with ID: ${warehouseId} does not exist`,
    });
  }
};

//J2W-12
const addWarehouse = (req, res) => {
  let result = isError("warehouse", req.body);
  if (!result) {
    let data = { id: uuidv4(), ...req.body };
    let warehouses = warehouseModel.getWarehousesList();
    warehouses.splice(0, 0, data);
    warehouseModel.updateWarehouse(warehouses);
    res.status(200).json(data);
  } else {
    res.status(400).json(result);
  }
};

//J2W-14
const editWarehouse = (req, res) => {
  // console.log(req.body);
  let result = isError("warehouse", req.body);

  if (!result) {
    const warehouseId = req.params.warehouseId;
    // console.log(warehouseId);
    let warehouses = warehouseModel.getWarehousesList();
    // console.log(warehouses);

    warehouses = warehouses.map((warehouse) => {
      if (warehouse.id === warehouseId) {
        console.log("found", warehouse);
        warehouse = { id: warehouse.id, ...req.body };
        console.log(warehouse);
        return warehouse;
      }
      return warehouse;
    });

    let warehouseToEdit = warehouses.find(
      (warehouse) => warehouse.id === warehouseId
    );

    warehouseModel.updateWarehouse(warehouses);

    res.status(200).json(warehouseToEdit);
  } else {
    res.status(400).json(result);
  }
};

//J2W-15
const deleteWarehouse = (req, res) => {
  console.log("deleted");
  const warehouseId = req.params.warehouseId;
  let warehouses = warehouseModel.getWarehousesList();
  //delete selected warehouse here
  if (!warehouseModel.getWarehouseById(warehouseId)) {
    return res.status(400).json(`warehouse with id ${warehouseId} not found`);
  }
  let warehouse = warehouseModel.getWarehouseById(warehouseId);

  let warehousesList = warehouses.filter((warehouse) => {
    if (warehouse.id !== warehouseId) {
      return warehouse;
    }
  });
  warehouseModel.updateWarehouse(warehousesList);

  //delete inventory corresponding to warehouseID

  if (req.query.fulldelete !== "no") {
    //this code does not run if the query parameter is no
    //by default it will delete the inventory with the warehouse
    let inventoryList = inventoryModel.getInventoryList();
    let inventoryUpdatedList = inventoryList.filter((inventory) => {
      if (inventory.warehouseID !== warehouseId) {
        return inventory;
      }
    });
    inventoryModel.updateInventory(inventoryUpdatedList);
    return res.status(200).json(warehouse);
  }

  return res.status(200).json(warehouse);
};

//J2W-35
// const getWarehouseNames = () => {
//   console.log(list);
// };

module.exports = {
  getWarehousesList,
  getWarehouseById,
  deleteWarehouse,
  addWarehouse,
  editWarehouse,
};
