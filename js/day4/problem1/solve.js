"use strict";

const readFile = require('fs').readFile;
const textFile = "../bingo.txt";
const encoding = "utf8";

const bingo = (err, data) => {
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
	const boardMarks = boards.map(_ => 0);

	for (const number of calledNumbers) {
		let checkForWin = false;

		for (let i = 0; i < boards.length; i++) {
			const board = boards[i];

			for (let row = 0; row < board.length; row++) {
				for (let col = 0; col < board[0].length; col++) {
					if (parseInt(board[row][col]) === number) {
						board[row][col] = "x" + board[row][col]
						boardMarks[i]++

						if (boardMarks[i] === 5) {
							checkForWin = true;
						}
					}
				}
			}
		}

		if (checkForWin) {
			for (let i = 0; i < boards.length; i++) {
				if (boardMarks[i] < 5) { continue; }

				const board = boards[i];

				if (isWin(board)) {
					const unmarkedSum = getUnmarkedSum(board);

					console.log(`Final Score: ${unmarkedSum * number}`);
					return;
				}
			}
		}
	}
}

function isWin(board) {
	// Check all rows for a win
	for (const row of board) {
		let winningLine = true;

		for (const num of row) {
			if (num[0] !== "x") {
				winningLine = false;
				break;
			}
		}

		if (winningLine) {
			return true;
		}
	}

	// Check all columns for a win
	for (let col = 0; col < board[0].length; col++) {
		let winningLine = true;

		for (let row = 0; row < board.length; row++) {
			if (board[row][col][0] !== "x") {
				winningLine = false;
				break;
			}
		}

		if (winningLine) {
			return true;
		}
	}
}

function getUnmarkedSum(board) {
	let sum = 0;

	for (const row of board) {
		for (const num of row) {
			if (num[0] === "x") { continue; }

			sum += parseInt(num);
		}
	}

	return sum;
}

readFile(textFile, encoding, bingo);
