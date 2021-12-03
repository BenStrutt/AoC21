"use strict";

/**
 * Fast ugly and naive solution at midnight
 */

const readFile = require('fs').readFile;
const textFile = "./binary.txt";
const encoding = "utf8";

const positionProduct = (err, data) => {
	const numbers = data.split("\n").map(str => str.trim());
	const frequencyArr = Array(numbers[0].length).fill(0);

	for (let i = 0; i < numbers.length; i++) {
		const numberStr = numbers[i];

		for (let ii = 0; ii < numberStr.length; ii++) {
			const digit = numberStr[ii];

			frequencyArr[ii] += (digit === "1" ? 1 : -1);
		}
	}

	const gamma = [];
	for (let i = 0; i < numbers[0].length; i++) {
		gamma.push(frequencyArr[i] > 0 ? 1 : 0);
	}

	const epsilon = gamma.map(num => num === 1 ? 0 : 1);
	
	const gammaDecimal = parseInt(gamma.join(""), 2);
	const epsilonDecimal = parseInt(epsilon.join(""), 2);

	console.log(gammaDecimal * epsilonDecimal);
}

readFile(textFile, encoding, positionProduct);
