"use strict";

const readFile = require('fs').readFile;
const textFile = "./commands.txt";
const encoding = "utf8";

const position = [0, 0];
let aim = 0;

global.down = (units) => { aim += units; }
global.up = (units) => { aim -= units; }
global.forward = (units) => {
	position[0] += units;
	position[1] += units * aim;
}

const positionProduct = (err, data) => {
	const commands = data.split("\n");

	commands.forEach((command) => {
		const [direction, amount] = command.split(" ");
		const units = parseInt(amount);

		global[direction](units);
	});

	console.log(position[0] * position[1]);
}

readFile(textFile, encoding, positionProduct);
