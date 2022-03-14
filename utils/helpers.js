const fs = require("fs");

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

module.exports = { readFile, writeFile };
