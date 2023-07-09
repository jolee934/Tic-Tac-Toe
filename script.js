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

  //use this to turn off the game once someone wins
  var gameRunning = true;

  //variable to determine which player's turn it is for each game; alternates every game
  var whoseTurn = 1;

  function restartGame() {
    game.board.forEach((n, i, arr) => {
      arr[i] = "";
    });
    updateBoard();
    gameRunning = true;
    //Changes Player turns each restart
    if (whoseTurn % 2) {
      pOne.turn = false;
    } else {
      pOne.turn = true;
    }
    whoseTurn = whoseTurn + 1;
  }

  function updateBoard() {
    cells.forEach((cell) => {
      const i = cell.dataset.index;
      cell.textContent = game.board[i];
    });
  }

  function checkWinner() {
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
    //updates score if there is a winner
    playerOneScore.textContent = pOne.score;
    playerTwoScore.textContent = pTwo.score;
  }

  return {
    updateBoard: updateBoard,
    restartGame: restartGame,
    gameRunning: gameRunning,
    checkWinner: checkWinner,
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

//*********Clicking action *************/

cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    const clickedCell = e.target;
    const i = cell.dataset.index;
    if (gameBoard.game.board[i] === "" && pOne.turn === true) {
      gameBoard.game.board[i] = "X";
      gameBoard.checkWinner();
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
      gameBoard.checkWinner();
      gameBoard.updateBoard();
      pOne.turn = true;
    }
  });
});

//*********Restart game *************/
restartButton.addEventListener("click", gameBoard.restartGame);

//check winner
//const combination = [1, 2, 3]
// for (const winner of game) {
