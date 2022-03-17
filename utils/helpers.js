const res = require("express/lib/response");
const fs = require("fs");
const { options } = require("../routes/warehouseRoutes");

//readfile
const readFile = (path) => {
  console.log("read successful");
  return JSON.parse(fs.readFileSync(path));
};

//writefile
const writeFile = (path, data) => {
  data = JSON.stringify(data);
  try {
    fs.writeFileSync(path, data);
    console.log("write successful");
  } catch (err) {
    console.log(err);
  }
};

//validation function to check whether post requests are valid
const isValid = (type, data) => {
  let options;
  let isError = true;
  if (type === "warehouse") {
    options = ["name", "address", "city", "country", "contact"];
    additionalInfo = ["name", "position", "phone", "email"];
  } else if (type === "inventory") {
    options = [];
  }

  for (i = 0; i < options.length; i++) {
    option = options[i];
    if (!data[option]) {
      //if any of the standard info missing error msg here
      isError = `Information missing: ${option}`;
      return isError;
    }
    if (typeof data[option] === "object") {
      for (i = 0; i < additionalInfo.length; i++) {
        let e = additionalInfo[i];
        // return e;
        if (!data[option][e]) {
          //If any contact info missing error message here
          isError = `Information missing: Contact ${e}`;
          return isError;
        }
      }
    }
  }
  return data;
};

module.exports = { readFile, writeFile, isValid };
