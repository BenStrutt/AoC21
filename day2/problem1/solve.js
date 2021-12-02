"use strict";

const readFile = require('fs').readFile;
const textFile = "./commands.txt";
const encoding = "utf8";

const commandMap = {
	forward: [0, 1],
	down: [1, 1],
	up: [1, -1],
};

const positionProduct = (err, data) => {
	const commands = data.split("\n");
	const position = [0, 0];

	commands.forEach((command) => {
		const [direction, amount] = command.split(" ");
		const [posIdx, posDir] = commandMap[direction];

		position[posIdx] += posDir * amount;
	});

    console.log(position[0] * position[1]);
}

readFile(textFile, encoding, positionProduct);