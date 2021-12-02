"use strict";

const readFile = require('fs').readFile;
const textFile = "./numbers.txt";
const encoding = "utf8";

function findDepthIncrease(err, data) {
	const numbers = data.split("\n").map(str => parseInt(str));
	
	let increases = 0;
	for (let i = 1; i < numbers.length; i++) {
		const b = numbers[i];
		const a = numbers[i - 1];

		if (b > a) { increases++; }
	}

	console.log({increases});
}

readFile(textFile, encoding, findDepthIncrease);