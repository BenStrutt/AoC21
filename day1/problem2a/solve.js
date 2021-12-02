"use strict";

const readFile = require('fs').readFile;
const textFile = "./numbers.txt";
const encoding = "utf8";

function depthIncreaseAmount(err, data) {
	const numbers = data.split("\n").map(str => parseInt(str));
	
	let increases = 0;
	for (let i = 4; i < numbers.length; i++) {
		const sum1 = numbers.slice(i - 4, i - 1).reduce((p, c) => p + c);
		const sum2 = numbers.slice(i - 3, i).reduce((p, c) => p + c);

		if (sum2 > sum1) { increases++; }
	}

	console.log({increases});
}

readFile(textFile, encoding, depthIncreaseAmount);
