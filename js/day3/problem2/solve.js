"use strict";

/**
 * Fast ugly and naive solution at midnight
 */

const readFile = require('fs').readFile;
const textFile = "./binary.txt";
const encoding = "utf8";

const positionProduct = (err, data) => {
	const numbers = data.split("\n").map(str => str.trim());
	const oxygenArr = numbers.slice();
	const co2Arr = numbers.slice();

	let index = 0;
	while (oxygenArr.length > 1 || co2Arr.length > 1) {
		let oxygenFreq = 0;
		for (const number of oxygenArr) {
			oxygenFreq += (number[index] === "1" ? 1 : -1);
		}

		let co2Freq = 0;
		for (const number of co2Arr) {
			co2Freq += (number[index] === "1" ? 1 : -1);
		}

		// remove invalid oxygen numbers
		if (oxygenArr.length > 1) {
			for (let i = oxygenArr.length - 1; i >= 0; i--) {
				if (oxygenArr.length === 1) { break; }

				const mostCommonBit = oxygenFreq >= 0 ? 1 : 0;
				const currentBit = parseInt(oxygenArr[i][index]);

				if (currentBit === mostCommonBit) { continue; }

				oxygenArr.splice(i, 1);
			}
		}

		// remove invalid oxygen numbers
		if (co2Arr.length > 1) {
			for (let i = co2Arr.length - 1; i >= 0; i--) {
				if (co2Arr.length === 1) { break; }

				const leastCommonBit = co2Freq >= 0 ? 0 : 1;
				const currentBit = parseInt(co2Arr[i][index]);

				if (currentBit === leastCommonBit) { continue; }

				co2Arr.splice(i, 1);
			}
		}

		if (oxygenArr.length === 1 && co2Arr.length === 1) { break; }

		index++;
	}

	const oxygenRating = parseInt(oxygenArr, 2);
	const co2Rating = parseInt(co2Arr, 2);

	console.log(oxygenRating * co2Rating);
}

readFile(textFile, encoding, positionProduct);
