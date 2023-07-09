const topA = document.querySelector(".top_a");
const topB = document.querySelector(".top_b");
const topC = document.querySelector(".top_c");
const midA = document.querySelector(".mid_a");
const midB = document.querySelector(".mid_b");
const midC = document.querySelector(".mid_c");
const botA = document.querySelector(".bot_a");
const botB = document.querySelector(".bot_b");
const botC = document.querySelector(".bot_c");
const restartButton = document.querySelector(".restart");
const backButton = document.querySelector(".back");
const difficultyButton = document.querySelector(".difficulty");
const cells = document.querySelectorAll(".cell");
const playerOneScore = document.querySelector(".player1_score");
const playerTwoScore = document.querySelector(".player2_score");

//*********Game Board Module *************/
var gameBoard = (function () {
  const game = {
    board: ["", "", "", "", "", "", "", "", ""],
  };

  var gameRunning = true;

  function restartGame() {
    game.board.forEach((n, i, arr) => {
      arr[i] = "";
    });
    updateBoard();
    gameRunning = true;
  }

  function updateBoard() {
    cells.forEach((cell) => {
      const i = cell.dataset.index;
      cell.textContent = game.board[i];
    });
    if (
      game.board[0] != "" &&
      game.board[1] != "" &&
      game.board[2] != "" &&
      game.board[0] === game.board[1] &&
      game.board[0] === game.board[2] &&
      gameRunning === true
    ) {
      if (pOne.turn === true) {
        console.log("Player 1 wins");
        pOne.score = pOne.score + 1;
        console.log(pOne.score);
      } else {
        console.log("Player 2 wins");
        pTwo.score = pTwo.score + 1;
      }
      gameRunning = false;
    }
    playerOneScore.textContent = pOne.score;
    playerTwoScore.textContent = pTwo.score;
  }

  return {
    updateBoard: updateBoard,
    restartGame: restartGame,
    gameRunning: gameRunning,
    game: game,
  };
})();

//*********Player Factory*************/
const playerFactory = (score, turn) => {
  return { score, turn };
};

const pOne = playerFactory(0, true);
const pTwo = playerFactory(0);
console.log(pOne);
console.log(pTwo);

// var pOne = (function () {
//   let pOneTurn = true;
//   let pOneScore = 0;

//   return {
//     pOneTurn: pOneTurn,
//     pOneScore: pOneScore,
//   };
// })();

// var pTwo = (function () {
//   let pTwoScore = 0;

//   return {
//     pTwoScore: pTwoScore,
//   };
// })();

//*********Clicking action *************/

cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    const clickedCell = e.target;
    const i = cell.dataset.index;
    if (gameBoard.game.board[i] === "" && pOne.turn === true) {
      gameBoard.game.board[i] = "X";
      gameBoard.updateBoard();
      pOne.turn = false;
    }
  });
});

cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    const clickedCell = e.target;
    const i = cell.dataset.index;
    if (gameBoard.game.board[i] === "" && pOne.turn === false) {
      gameBoard.game.board[i] = "0";
      gameBoard.updateBoard();
      pOne.turn = true;
    }
  });
});

//*********Restart game *************/
restartButton.addEventListener("click", gameBoard.restartGame);

//***********Winning mechanic *************/

// 123, 345, 789;

// 147;
// 258;
// 369;
// 159;
// 357;
