const topA = document.querySelector(".top_a");
const topB = document.querySelector(".top_b");
const topC = document.querySelector(".top_c");
const midA = document.querySelector(".mid_a");
const midB = document.querySelector(".mid_b");
const midC = document.querySelector(".mid_c");
const botA = document.querySelector(".bot_a");
const botB = document.querySelector(".bot_b");
const botC = document.querySelector(".bot_c");
const restartButton = document.querySelector(".continue");
const backButton = document.querySelector(".back");
const difficultyButton = document.querySelector(".difficulty");
const cells = document.querySelectorAll(".cell");
const playerOneScore = document.querySelector(".player1_score");
const playerTwoScore = document.querySelector(".player2_score");
const tieScore = document.querySelector(".tie_score");
const winner = document.querySelector(".winner");
const popup = document.querySelector(".popup");
const dropdownToggle = document.querySelector(".dropdownbtn");
const dropdownMenu = document.querySelector(".dropdownMenu");

//*********Game Board Module *************/
var gameBoard = (function () {
  const game = {
    board: ["", "", "", "", "", "", "", "", ""],
  };

  //use this to turn off the game once someone wins
  let gameRunning = true;

  //use this to determine who goes first, based on even/odd numbered game
  let gameNumber = 2;

  //tie variable
  let tie = 0;

  //Function to restart the game
  function restartGame() {
    game.board.forEach((n, i, arr) => {
      arr[i] = "";
    });
    winner.textContent = "";
    updateBoard();
    popupToggle();
    gameBoard.gameRunning = true;
    //Changes Player turns each restart
    if (gameBoard.gameNumber % 2) {
      pOne.turn = true;
      pTwo.turn = false;
    } else {
      pOne.turn = false;
      pTwo.turn = true;
    }
    gameBoard.gameNumber++;
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
          winner.textContent = "Player 1 Wins! Congratulations!";
          pOne.incrementScore();
        } else {
          console.log("Player 2 wins");
          winner.textContent = "Player 2 Wins! Congratulations!";
          pTwo.incrementScore();
        }
        gameBoard.gameRunning = false;
        popupToggle();
        break;
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
      winner.textContent = "Tie Game!";
      gameBoard.gameRunning = false;
      popupToggle();
    }
  }

  return {
    updateBoard: updateBoard,
    restartGame: restartGame,
    gameRunning: gameRunning,
    checkTie: checkTie,
    checkWinner: checkWinner,
    game: game,
    gameNumber: gameNumber,
  };
})();

//*********Player Factory*************/
const playerFactory = (score, turn) => {
  const incrementScore = function () {
    this.score++;
  };
  const toggleTurn = function () {
    this.turn = !this.turn;
  };

  const isTurn = () => {
    return turn;
  };

  return { turn, isTurn, score, toggleTurn, incrementScore };
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
      pOne.toggleTurn();
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
      pOne.toggleTurn();
    }
  });
});

//*********Restart game *************/
restartButton.addEventListener("click", gameBoard.restartGame);

//*********Toggle popup *************/
function popupToggle() {
  popup.classList.toggle("hidden");
}

//*********Difficulty drop down menu *************/
dropdownToggle.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden");
});
