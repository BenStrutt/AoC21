"use strict";

const readFile = require('fs').readFile;
const textFile = "./bingo.txt";
const encoding = "utf8";

const positionProduct = (err, data) => {
	const lines = data.split("\n");
	const calledNumbers = lines.shift().split(",").map(num => parseInt(num));
	const boards = [];

	// build board arrays
	const board = [];
	for (let i = 1; i < lines.length; i++) {
		if (lines[i].length === 0) {
			boards.push(board.slice());
			board.length = 0;
		} else {
			const line = lines[i].split(/ +/);
			if (line[0] === "") { line.shift(); }

			board.push(line);
		}
	}
	boards.push(board.slice());

	// mark numbers in order until a winning board
	numberLoop:
	for (const numberStr of calledNumbers) {
		const number = parseInt(numberStr);

		for (let i = 0; i < boards.length; i++) {
			const board = boards[i];

			for (let y = 0; y < board.length; y++) {
				const line = board[y];

				for (let x = 0; x < line.length; x++) {
					if (parseInt(line[x]) === number) {
						board[y][x] = parseInt(line[x]);
					}
				}
			}

			const winningLine = getWinningLine(board);
			if (winningLine.length > 0) {
				const winningScore = winningLine.reduce((a, b) => a + b) * number;
				console.log(winningLine);
				console.log(number);
				console.log(winningScore);
				break numberLoop;
			}
		}
	}
}

function getWinningLine(board) {
	// // check rows
	// rowLoop:
	// for (let y = 0; y < board.length; y++) {
	// 	const line = board[y];

	// 	for (let x = 0; x < line.length; x++) {
	// 		if (typeof line[x] === "string") { continue rowLoop; }
	// 	}

	// 	return line;
	// }

	// check columns
	columnLoop:
	for (let x = 0; x < board[0].length; x++) {
		const line = [];

		for (let y = 0; y < board.length; y++) {
			if (typeof board[y][x] === "string") { continue columnLoop; }

			line.push(board[y][x]);
		}

		return line;
	}

	return [];
}

readFile(textFile, encoding, positionProduct);