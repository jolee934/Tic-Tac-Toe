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
const dropdownBtn = document.querySelector(".dropdownbtn");
const dropdownMenu = document.querySelector(".dropdownMenu");
const titleDropdownBtn = document.querySelector(".title_dropdownbtn");
const titleDropdownMenu = document.querySelector(".title_dropdownMenu");
const robotBtn = document.querySelector(".robot_btn");
const humanBtn = document.querySelector(".human_btn");
const gameDisplay = document.querySelector(".game_display");
const easyBtn = document.getElementById("easy");
const medBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const body = document.querySelector("body");

let cellNumber = [];
for (let i = 0; i <= 8; i++) {
  let number = document.querySelector(`[data-index="${i}"]`);
  cellNumber.push(number);
}

//*********Tile screen*************/

robotBtn.addEventListener("click", function () {
  titleDropdownBtn.classList.toggle("hidden");
  robotBtn.classList.toggle("clicked");
});

humanBtn.addEventListener("click", function () {
  titleDropdownBtn.classList.toggle("hidden");
  humanBtn.classList.toggle("clicked");
});

//*********Initialize game *************/
let ai = true;
let twoPlayer = false;
gameDisplay.classList.toggle("hidden");

let easy = false;
let medium = false;
let hard = false;

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
    //clears the board array
    game.board.forEach((n, i, arr) => {
      arr[i] = "";
    });
    updateBoard();
    //clears winner and popip
    winner.textContent = "";
    popupToggle();
    //turns on game
    gameBoard.gameRunning = true;
    //Changes Player turns each restart - Player 1 starts odd turns, player 2 even turn
    if (gameBoard.gameNumber % 2) {
      pOne.turn = true;
      pTwo.turn = false;
    } else {
      pOne.turn = false;
      pTwo.turn = true;
    }
    gameBoard.gameNumber++;

    //highlights current turn
    isPlayerOneTurn();
    isPlayerTwoTurn();

    //AI's turn upon restarting agme, if it turn
    aiTurn();
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
        } else if (pTwo.turn === true) {
          console.log("Player 2 wins");
          winner.textContent = "Player 2 Wins! Congratulations!";
          pTwo.incrementScore();
        }
        gameBoard.gameRunning = false;
        popupToggle();
        clearPlayerHighlights();
        break;
      }
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
      clearPlayerHighlights();
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
const pTwo = playerFactory(0, false);

//*********Toggle current player's turn *************/
function isPlayerOneTurn() {
  if (pOne.turn === true) {
    playerOne.classList.add("currentTurn");
  }
  if (pOne.turn === false) {
    playerOne.classList.remove("currentTurn");
  }
}

function isPlayerTwoTurn() {
  if (pTwo.turn === true) {
    playerTwo.classList.add("currentTurn");
  }
  if (pTwo.turn === false) {
    playerTwo.classList.remove("currentTurn");
  }
}

isPlayerOneTurn();
isPlayerTwoTurn();

//*********Clear current player's turn *************/
function clearPlayerHighlights() {
  playerOne.classList.remove("currentTurn");
  playerTwo.classList.remove("currentTurn");
}

//*********Clicking action *************/

//Player 1 click action
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
      gameBoard.updateBoard();
      gameBoard.checkWinner();
      pOne.toggleTurn();
      pTwo.toggleTurn();
      isPlayerOneTurn();
      isPlayerTwoTurn();
      console.log(`player one turn is ${pOne.turn}`);
      console.log(`player 2 turn is ${pTwo.turn}`);
      aiTurn();
      if (gameBoard.gameRunning === false) {
        clearPlayerHighlights();
      }
    }
  });
});

//Player 2 click action
cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    const clickedCell = e.target;
    const i = cell.dataset.index;
    if (
      gameBoard.game.board[i] === "" &&
      pOne.turn === false &&
      gameBoard.gameRunning === true &&
      ai === false
    ) {
      gameBoard.game.board[i] = "0";
      gameBoard.checkWinner();
      gameBoard.updateBoard();
      pOne.toggleTurn();
      pTwo.toggleTurn();
      isPlayerOneTurn();
      isPlayerTwoTurn();
    }
  });
});

//*********Restart game *************/
restartButton.addEventListener("click", gameBoard.restartGame);

//*********Toggle popup *************/
function popupToggle() {
  popup.classList.toggle("hidden");
  body.classList.toggle("blur");
  popup.classList.toggle("blur");
}

//*********Difficulty drop down menu *************/
dropdownBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden");
});

titleDropdownBtn.addEventListener("click", function () {
  titleDropdownMenu.classList.toggle("hidden");
});

//*********Select difficulty *************/
easyBtn.addEventListener("click", function () {
  easy = true;
  medium = false;
  hard = false;

  dropdownBtn.textContent = "Easy";
  dropdownMenu.classList.toggle("hidden");
  titleDropdownBtn.textContent = "Easy";
  titleDropdownMenu.classList.toggle("hidden");
});

medBtn.addEventListener("click", function () {
  easy = false;
  medium = true;
  hard = false;

  dropdownBtn.textContent = "Medium";
  dropdownMenu.classList.toggle("hidden");
  titleDropdownBtn.textContent = "Medium";
  titleDropdownMenu.classList.toggle("hidden");
});

hardBtn.addEventListener("click", function () {
  easy = false;
  medium = false;
  hard = true;

  dropdownBtn.textContent = "Hard";
  dropdownMenu.classList.toggle("hidden");
  titleDropdownBtn.textContent = "Hard";
  titleDropdownMenu.classList.toggle("hidden");
});

//****************AI Mechanic *******************/

function aiTurn() {
  if (pOne.turn === false && ai === true && gameBoard.gameRunning === true) {
    setTimeout(function () {
      let aiNumber;
      while (true) {
        if (hard === true) {
          const c = finishingMove();
          if (c || c === 0) {
            aiNumber = c;
            break;
          }
        }
        if (medium === true || hard === true) {
          const c = defend();
          if (c || c === 0) {
            aiNumber = c;
            break;
          }
        }
        aiNumber = randomNumber(9);
        if (
          !gameBoard.game.board[aiNumber] ||
          gameBoard.game.board.every((elem) => elem !== "")
        ) {
          break;
        }
      }
      gameBoard.game.board[aiNumber] = "0";
      gameBoard.checkWinner();
      gameBoard.updateBoard();

      pOne.toggleTurn();
      pTwo.toggleTurn();
      isPlayerOneTurn();
      isPlayerTwoTurn();
      if (gameBoard.gameRunning === false) {
        clearPlayerHighlights();
      }
    }, 1000);
  }
}

function defend() {
  const defense = [
    [0, 1, 2],
    [1, 2, 0],
    [2, 0, 1],
    [3, 4, 5],
    [4, 5, 3],
    [3, 5, 4],
    [6, 7, 8],
    [7, 8, 6],
    [6, 8, 7],
    [3, 6, 0],
    [0, 3, 6],
    [1, 4, 7],
    [4, 7, 1],
    [2, 5, 8],
    [2, 8, 5],
    [5, 8, 2],
    [0, 4, 8],
    [2, 4, 6],
    [6, 4, 2],
    [4, 8, 0],
  ];
  for (const x of defense) {
    const [a, b, c] = x;
    if (
      gameBoard.game.board[a] === "X" &&
      gameBoard.game.board[b] === "X" &&
      !gameBoard.game.board[c]
    ) {
      console.log("defend");
      return c;
    }
  }
}

function finishingMove() {
  const aboutToWin = [
    [0, 1, 2],
    [2, 1, 0],
    [2, 0, 1],
    [3, 4, 5],
    [5, 4, 3],
    [3, 5, 4],
    [6, 7, 8],
    [8, 7, 6],
    [8, 6, 7],
    [0, 3, 6],
    [0, 6, 3],
    [6, 3, 0],
    [1, 4, 7],
    [7, 4, 1],
    [1, 7, 4],
    [2, 5, 8],
    [8, 5, 2],
    [8, 2, 5],
    [0, 4, 8],
    [8, 4, 0],
    [8, 0, 4],
    [2, 4, 6],
    [6, 4, 2],
    [6, 2, 4],
  ];
  for (x of aboutToWin) {
    const [a, b, c] = x;
    if (
      gameBoard.game.board[a] === "0" &&
      gameBoard.game.board[b] === "0" &&
      !gameBoard.game.board[c]
    ) {
      console.log("attack");
      return c;
    }
  }
}

//****************Random number generator for first pick of AI*******************/
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
