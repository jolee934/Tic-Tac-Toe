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
const playerOne = document.querySelector(".player_1");
const playerTwo = document.querySelector(".player_2");
const tieScore = document.querySelector(".tie_score");
const winner = document.querySelector(".winner");
const popup = document.querySelector(".popup");
const dropdownToggle = document.querySelector(".dropdownbtn");
const dropdownMenu = document.querySelector(".dropdownMenu");

let cellNumber = [];
for (let i = 0; i <= 8; i++) {
  let number = document.querySelector(`[data-index="${i}"]`);
  cellNumber.push(number);
}

//*********Initialize game *************/
let ai = true;
let twoPlayer = false;

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

  return { turn, score, toggleTurn, incrementScore };
};

const pOne = playerFactory(0, true);
const pTwo = playerFactory(0);

if (pOne.turn === true) {
  playerOne.classList.toggle("currentTurn");
}

if (pTwo.turn === true) {
  playerTwo.classList.toggle("currentTurn");
}

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
      aiTurn();
      playerOne.classList.toggle("currentTurn");
      playerTwo.classList.toggle("currentTurn");
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
      playerOne.classList.toggle("currentTurn");
      playerTwo.classList.toggle("currentTurn");
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

//****************AI Mechanic *******************/

function aiTurn() {
  if (pOne.turn === false && ai === true) {
    gameBoard.game.board[5] = "0";
    gameBoard.checkWinner();
    gameBoard.updateBoard();
    pOne.toggleTurn();
    playerOne.classList.toggle("currentTurn");
    playerTwo.classList.toggle("currentTurn");
  }
}

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
console.log(randomNumber(9));
