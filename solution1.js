const prompt = require('prompt-sync')();

let board = [
  [1, 2, 3],
  [4, 5, 6],
  [8, 7, 0],
];

const boardDimension = 3;

const printBoard = () => {
  for (const key in board) {
    if (board.hasOwnProperty(key)) {
      console.log(board[key]);
    }
  }
}

const isInt = (value) => {
  const x = parseInt(value);
  return !isNaN(value) && (x | 0) === x;
}

const startGame = () => {
  let selectedNum;
  printBoard();

  while (true) {
    let userInp = prompt("Please enter the field you want to move: ");

    if (isInt(userInp)) {
      selectedNum = parseInt(userInp)
      if (selectedNum <= 8 && selectedNum >= 1) {
        break;
      }
    }
    console.log("Please enter a valid field number.")
  }
}

startGame();