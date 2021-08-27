const prompt = require('prompt-sync')();

let board = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 0, 8],
]

const lowestNum = 1;
const biggestNum = 8;

const printBoard = () => {
  board.forEach((row) => {
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

const updateBoard = (selectedNum, selectedNumPos, zeroPos) => {
  board[selectedNumPos[0]][selectedNumPos[1]] = 0;
  board[zeroPos[0]][zeroPos[1]] = selectedNum;
}

const checkWin = () => {
  let lastnum;
  let num;
  let rowLen = board[0].length
  for (let row = 0; row < board.length; row++) {
    for (let i = 0; i < rowLen; i++) {

      num = board[row][i]

      if (num === 0 && !lastnum) {
        continue
      } else if (num === 0 && lastnum) {
        return false
      }
      if (num === lowestNum)
        if (num === biggestNum) {
          return true
        }
      if (!lastnum) {
        if (num === 0) {
          continue
        } else if (num === lowestNum) {
          lastnum = num
          continue
        } else {
          return false
        }
      }
      if (lastnum + 1 === num) {
        if (num === biggestNum) {
          return true
        }
        lastnum = num
      } else {
        return false
      }
    }
  }
}

const startGame = () => {

  let gameRunning = true;

  while (gameRunning) {

    let selectedNum;
    let selectedNumPos;
    let zeroPos;
    printBoard();

    while (true) {
      let userInp = prompt("Please enter the field you want to move: ");

      if (isInt(userInp)) {
        selectedNum = parseInt(userInp)
        if (selectedNum <= biggestNum && selectedNum >= lowestNum) {

          selectedNumPos = getIndex(selectedNum);
          zeroPos = getIndex(0);

          if (checkValidStep(selectedNumPos, zeroPos)) {
            break;
          }
        }
      }
      console.log("Please enter a valid field number.")
    }
    updateBoard(selectedNum, selectedNumPos, zeroPos)
    if (checkWin()) {
      console.log("You have won!")
      gameRunning = false;
    }
  }
}

startGame();