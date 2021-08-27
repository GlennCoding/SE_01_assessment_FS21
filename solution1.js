const prompt = require('prompt-sync')();

let board = [
  [1, 2, 3],
  [4, 5, 6],
  [8, 7, 0],
]

const boardDimension = 3;

const printBoard = () => {
  board.map((row) => {
    console.log(row)
  })
}

const isInt = (value) => {
  const x = parseInt(value);
  return !isNaN(value) && (x | 0) === x;
}

const getIndex = (num) => {
  let numIndex;
  board.forEach((row, index) => {
    if (row.includes(num)) {
      numIndex = [index, row.indexOf(num)]
    }
  })
  return numIndex
}

const getDifference = (a, b) => {
  return Math.abs(a - b);
}

const checkValidStep = (pos1, pos2) => {
  // Check if row the smae
  if (pos1[0] === pos2[0]) {
    // Check if difference in row === 1
    if (getDifference(pos1[1], pos2[1]) === 1) {
      return true
    }
  } else {
    // Check if difference in column === 1
    if (getDifference(pos1[0], pos2[0]) === 1) {
      // Check if on same column
      if (pos1[1] === pos2[1]) {
        return true
      }
    }
  }
  return false
}

const selectMove = () => {
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

  const selectedNumPos = getIndex(selectedNum);
  const zeroPos = getIndex(0);

  if (checkValidStep(selectedNumPos, zeroPos)) {
    console.log("good")
  } else {
    console.log("bad")
  }
}

selectMove();
