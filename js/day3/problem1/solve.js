"use strict";

/**
 * Fast ugly and naive solution at midnight
 */

const readFile = require('fs').readFile;
const textFile = "./binary.txt";
const encoding = "utf8";

const positionProduct = (err, data) => {
	const numbers = data.split("\n").map(str => str.trim());
	const digitLen = numbers[0].length;
	const frequencyArr = Array(digitLen).fill(0);

	for (const number of numbers) {
		for (let ii = 0; ii < digitLen; ii++) {
			const digit = number[ii];

			frequencyArr[ii] += (digit === "1" ? 1 : -1);
		}
	}

	const gamma = [];
	const epsilon = [];
	for (let i = 0; i < digitLen; i++) {
		gamma.push(frequencyArr[i] > 0 ? 1 : 0);
		epsilon.push(frequencyArr[i] > 0 ? 0 : 1);
	}

	const gammaDecimal = parseInt(gamma.join(""), 2);
	const epsilonDecimal = parseInt(epsilon.join(""), 2);

	console.log(gammaDecimal * epsilonDecimal);
}

readFile(textFile, encoding, positionProduct);
