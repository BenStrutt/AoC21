"use strict";

/**
 * Day 1 Problem 2 implemented in the "right" way after looking at solutions.
 */

const readFile = require('fs').readFile;
const textFile = "./numbers.txt";
const encoding = "utf8";

function depthIncreaseAmount(err, data) {
	const numbers = data.split("\n").map(str => parseInt(str));
	
	let increases = 0;
	for (let i = 3; i < numbers.length; i++) {
		const b = numbers[i];
		const a = numbers[i - 3];

		if (b > a) { increases++; }
	}

	console.log({increases});
}

readFile(textFile, encoding, depthIncreaseAmount);