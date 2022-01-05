"use strict";

const readFile = require('fs').readFile;
const textFile = "./binary.txt";
const encoding = "utf8";

const positionProduct = (err, data) => {
	const lines = data.split("\n").map(str => str.trim());
}

readFile(textFile, encoding, positionProduct);
