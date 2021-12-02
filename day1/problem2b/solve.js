"use strict";

/**
 * Another shot at Day 1 Problem 2 without using standard library array methods.
 */

const readFile = require('fs').readFile;
const textFile = "./numbers.txt";
const encoding = "utf8";

function depthIncreaseAmount(err, data) {
	const numbers = data.split("\n").map(str => parseInt(str));

	const windowArr = [];
	const windowAmount = 2;
	const windowLength = 3;

	let increases = 0;
	for (let i = 0; i < numbers.length - windowLength; i++) {
		for (let ii = 0; ii < windowAmount; ii++) {
			let windowSum = 0;

			for (let iii = 0; iii < windowLength; iii++) {
				windowSum += numbers[i + ii + iii];
			}

			windowArr[ii] = windowSum;
		}

		if (windowArr[0] < windowArr[1]) { increases++; }
	}

	console.log({increases});
}

readFile(textFile, encoding, depthIncreaseAmount);
