const fs = require("fs");

const data = fs.readFileSync("bingo.txt").toString().trim().split("\n\n");

const numbersToDraw = data[0]
  .trim()
  .split(",")
  .map((x) => parseInt(x));

const boards = data
  .slice(1)
  .map(parseDataToRowArrays)
  .map(convertToBoardObject);

let scores = [];
for (let i = 5; scores.length == 0; i++) {
  const drawnNumbers = numbersToDraw.slice(0, i + 1);
  scores = boards
    .filter((board) => isBoardComplete(board, drawnNumbers))
    // .map((x) => computeScore(x, drawnNumbers))
    // .sort()
    // .reverse();
}
console.log(scores[0]);

function parseDataToRowArrays(data) {
  return data.split("\n").map((row) =>
    row
      .trim()
      .split(/\s+/g)
      .map((x) => parseInt(x))
  );
}
function convertToBoardObject(rows) {
  return {
    rows,
    cols: rows[0].map((_, i) => rows.map((row) => row[i])),
  };
}

function areAllElementsInDrawnNumbers(elementArr, drawnNumbers) {
  return elementArr.every((element) => drawnNumbers.includes(element));
}
function isBoardComplete(board, drawnNumbers) {
  const matchingRows = board.rows.some((row) =>
    areAllElementsInDrawnNumbers(row, drawnNumbers)
  );
  const matchingCols = board.cols.some((col) =>
    areAllElementsInDrawnNumbers(col, drawnNumbers)
  );
  return matchingCols || matchingRows;
}
function computeScore(board, drawnNumbers) {
  return (
    board.rows
      .flatMap((row) => row)
      .flatMap((element) => element)
      .filter((element) => !drawnNumbers.includes(element))
      .reduce((a, b) => a + b) * drawnNumbers[drawnNumbers.length - 1]
  );
}
