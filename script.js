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
const tieScore = document.querySelector(".tie_score");

//*********Game Board Module *************/
var gameBoard = (function () {
  const game = {
    board: ["", "", "", "", "", "", "", "", ""],
  };

  //use this to turn off the game once someone wins
  let gameRunning = true;

  //variable to determine which player's turn it is for each game; alternates every game
  var whoseTurn = 1;

  let tie = 0;

  function restartGame() {
    game.board.forEach((n, i, arr) => {
      arr[i] = "";
    });
    updateBoard();
    gameBoard.gameRunning = true;
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
    const winningNumbers = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const x of winningNumbers) {
      const [a, b, c] = x;
      if (
        game.board[a] &&
        game.board[a] === game.board[b] &&
        game.board[a] === game.board[c]
      ) {
        if (pOne.turn === true) {
          console.log("Player 1 wins");
          pOne.score = pOne.score + 1;
        } else {
          console.log("Player 2 wins");
          pTwo.score = pTwo.score + 1;
        }
        gameBoard.gameRunning = false;
      }

      //updates score if there is a winner
    }
    checkTie();
    playerOneScore.textContent = pOne.score;
    playerTwoScore.textContent = pTwo.score;
    tieScore.textContent = tie;
  }

  function checkTie() {
    if (
      gameBoard.gameRunning === true &&
      game.board[0] &&
      game.board[1] &&
      game.board[2] &&
      game.board[3] &&
      game.board[4] &&
      game.board[5] &&
      game.board[6] &&
      game.board[7] &&
      game.board[8]
    ) {
      tie = tie + 1;
      console.log("tie game");
      gameBoard.gameRunning = false;
    }
  }

  return {
    updateBoard: updateBoard,
    restartGame: restartGame,
    gameRunning: gameRunning,
    checkTie: checkTie,
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

//*********Clicking action *************/

cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    const clickedCell = e.target;
    const i = cell.dataset.index;
    if (
      gameBoard.game.board[i] === "" &&
      pOne.turn === true &&
      gameBoard.gameRunning === true
    ) {
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
    if (
      gameBoard.game.board[i] === "" &&
      pOne.turn === false &&
      gameBoard.gameRunning === true
    ) {
      gameBoard.game.board[i] = "0";
      gameBoard.checkWinner();

      gameBoard.updateBoard();
      pOne.turn = true;
    }
  });
});

//*********Restart game *************/
restartButton.addEventListener("click", gameBoard.restartGame);
