//Board
// const topA = document.querySelector(".top_a");
// const topB = document.querySelector(".top_b");
// const topC = document.querySelector(".top_c");
// const midA = document.querySelector(".mid_a");
// const midB = document.querySelector(".mid_b");
// const midC = document.querySelector(".mid_c");
// const botA = document.querySelector(".bot_a");
// const botB = document.querySelector(".bot_b");
// const botC = document.querySelector(".bot_c");
//Doms for the Board: Data attribute for each cell
let cellNumber = [];
for (let i = 0; i <= 8; i++) {
  let number = document.querySelector(`[data-index="${i}"]`);
  cellNumber.push(number);
}
const cells = document.querySelectorAll(".cell");
const body = document.querySelector("body");
const gameDisplay = document.querySelector(".game_display");

console.log(cellNumber);
//*********Initialize game *************/
let ai = true;
gameDisplay.classList.add("hidden");

let easy = false;
let medium = false;
let hard = false;

//*********Tile screen*************/

const robotBtn = document.querySelector(".robot_btn");
const humanBtn = document.querySelector(".human_btn");
const startBtn = document.querySelector(".start");
const titleDropdownBtn = document.querySelector(".title_dropdownbtn");
const titleDropdownMenu = document.querySelector(".title_dropdownMenu");
const titleEasyBtn = document.getElementById("title_easy");
const titleMedBtn = document.getElementById("title_medium");
const titleHardBtn = document.getElementById("title_hard");
const titleScreen = document.querySelector(".title_screen");
const message = document.querySelector(".message");
const backButton = document.querySelectorAll(".b_btn");

robotBtn.addEventListener("click", function () {
  titleDropdownBtn.classList.remove("hidden");
  robotBtn.classList.add("clicked");
  humanBtn.classList.remove("clicked");
  startBtn.classList.remove("hidden");
  message.classList.remove("hidden");
  dropdownBtn.classList.remove("hidden");
  ai = true;
});

humanBtn.addEventListener("click", function () {
  titleDropdownBtn.classList.add("hidden");
  humanBtn.classList.add("clicked");
  robotBtn.classList.remove("clicked");
  startBtn.classList.remove("hidden");
  message.classList.add("hidden");
  titleDropdownMenu.classList.add("hidden");
  dropdownBtn.classList.add("hidden");
  ai = false;
});

titleDropdownBtn.addEventListener("click", function () {
  titleDropdownMenu.classList.toggle("hidden");
});

startBtn.addEventListener("click", function () {
  if (
    ai === false ||
    (ai === true && (easy === true || medium === true || hard === true))
  ) {
    titleScreen.classList.add("hidden");
    gameDisplay.classList.remove("hidden");
    message.classList.remove("error");
  } else {
    message.classList.add("error");
  }
});

titleEasyBtn.addEventListener("click", function () {
  easy = true;
  medium = false;
  hard = false;
  titleDropdownBtn.textContent = "Easy";
  titleDropdownMenu.classList.add("hidden");
  dropdownBtn.textContent = "Easy";
});

titleMedBtn.addEventListener("click", function () {
  easy = false;
  medium = true;
  hard = false;
  titleDropdownBtn.textContent = "Medium";
  titleDropdownMenu.classList.add("hidden");
  dropdownBtn.textContent = "Medium";
});

titleHardBtn.addEventListener("click", function () {
  easy = false;
  medium = false;
  hard = true;
  titleDropdownBtn.textContent = "Hard";
  titleDropdownMenu.classList.add("hidden");
  dropdownBtn.textContent = "Hard";
});

//*********Game Board Module *************/
const playerOneScore = document.querySelector(".player1_score");
const playerTwoScore = document.querySelector(".player2_score");
const playerOne = document.querySelector(".player_1");
const playerTwo = document.querySelector(".player_2");
const tieScore = document.querySelector(".tie_score");
const winner = document.querySelector(".winner");
const popup = document.querySelector(".popup");

var gameBoard = (function () {
  const game = {
    board: ["", "", "", "", "", "", "", "", ""],
  };

  //use this to turn off the game once someone wins
  let gameIsRunning = true;

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
    removeMarker();
    //clears winner and popip
    winner.textContent = "";
    popupToggle();
    //turns on game
    gameBoard.gameIsRunning = true;
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

  function createX(n) {
    const div = document.querySelector(`[data-index="${n}"]`);
    const container = document.createElement("div");
    const img = document.createElement("img");
    img.src = "img/x.png";
    container.classList.add("marked");
    img.classList.add("markerX");
    div.appendChild(container);
    container.appendChild(img);
  }

  function updateBoard() {
    cells.forEach((cell) => {
      const i = cell.dataset.index;
      console.log(game.board[i]);

      // if (cell.textContent = "") {
      //
      // }
      // cell.textContent = game.board[i];
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
          winner.textContent = "Player 1 Wins! Congratulations!";
          pOne.incrementScore();
        } else if (pTwo.turn === true) {
          winner.textContent = "Player 2 Wins! Congratulations!";
          pTwo.incrementScore();
        }
        gameBoard.gameIsRunning = false;
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
      gameBoard.gameIsRunning === true &&
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
      winner.textContent = "Tie Game!";
      gameBoard.gameIsRunning = false;
      popupToggle();
      clearPlayerHighlights();
    }
  }

  return {
    updateBoard: updateBoard,
    restartGame: restartGame,
    gameIsRunning: gameIsRunning,
    checkTie: checkTie,
    checkWinner: checkWinner,
    game: game,
    gameNumber: gameNumber,
    createX: createX,
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
      gameBoard.gameIsRunning === true
    ) {
      gameBoard.game.board[i] = "X";
      gameBoard.createX(i);
      gameBoard.updateBoard();
      gameBoard.checkWinner();
      pOne.toggleTurn();
      pTwo.toggleTurn();
      isPlayerOneTurn();
      isPlayerTwoTurn();
      aiTurn();
      if (gameBoard.gameIsRunning === false) {
        clearPlayerHighlights();
      }
    }
  });
});

body.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  removeMarker();
});

function removeMarker() {
  const img = document.querySelectorAll(".marked");
  img.forEach((image) => {
    image.remove();
  });
}

function createO(n) {
  const div = document.querySelector(`[data-index="${n}"]`);
  const container = document.createElement("div");
  const img = document.createElement("img");
  img.src = "img/o.png";
  container.classList.add("marked");
  img.classList.add("markerO");
  div.appendChild(container);
  container.appendChild(img);
}

//Player 2 click action
cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    const clickedCell = e.target;
    const i = cell.dataset.index;
    if (
      gameBoard.game.board[i] === "" &&
      pOne.turn === false &&
      gameBoard.gameIsRunning === true &&
      ai === false
    ) {
      gameBoard.game.board[i] = "0";
      createO(i);
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
const restartButton = document.querySelector(".continue");
restartButton.addEventListener("click", gameBoard.restartGame);

//*********Reset game with back button*************/

backButton.forEach((x) => {
  x.addEventListener("click", function () {
    reset();
  });
});

function reset() {
  //clears the board array
  removeMarker();
  gameBoard.game.board.forEach((n, i, arr) => {
    arr[i] = "";
  });
  gameBoard.updateBoard();
  winner.textContent = "";
  gameBoard.gameIsRunning = true;
  gameBoard.gameNumber = 2;
  gameBoard.gameNumber = 0;
  gameBoard.tie = 0;
  ai = true;
  easy = false;
  medium = false;
  hard = false;
  titleDropdownBtn.classList.add("hidden");
  message.classList.add("hidden");
  robotBtn.classList.remove("clicked");
  humanBtn.classList.remove("clicked");
  popup.classList.remove("blur");
  popup.classList.add("hidden");
  gameDisplay.classList.remove("blur");
  gameDisplay.classList.add("hidden");
  titleScreen.classList.remove("hidden");
  titleDropdownBtn.textContent = "Difficulty";
  startBtn.classList.add("hidden");
  pOne.score = 0;
  pTwo.score = 0;
  playerOneScore.textContent = pOne.score;
  playerTwoScore.textContent = pTwo.score;
  tieScore.textContent = gameBoard.tie;
}

//*********Toggle popup *************/
function popupToggle() {
  popup.classList.toggle("hidden");
  gameDisplay.classList.toggle("blur");
  popup.classList.remove("blur");
}

//*********Difficulty drop down menu *************/
const dropdownBtn = document.querySelector(".dropdownbtn");
const dropdownMenu = document.querySelector(".dropdownMenu");

dropdownBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden");
});

//*********Select difficulty *************/
const easyBtn = document.getElementById("easy");
const medBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");

easyBtn.addEventListener("click", function () {
  easy = true;
  medium = false;
  hard = false;

  dropdownBtn.textContent = "Easy";
  dropdownMenu.classList.add("hidden");
});

medBtn.addEventListener("click", function () {
  easy = false;
  medium = true;
  hard = false;

  dropdownBtn.textContent = "Medium";
  dropdownMenu.classList.add("hidden");
});

hardBtn.addEventListener("click", function () {
  easy = false;
  medium = false;
  hard = true;

  dropdownBtn.textContent = "Hard";
  dropdownMenu.classList.add("hidden");
});

//****************AI Mechanic *******************/

function aiTurn() {
  if (pOne.turn === false && ai === true && gameBoard.gameIsRunning === true) {
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
      createO(aiNumber);
      gameBoard.checkWinner();
      gameBoard.updateBoard();

      pOne.toggleTurn();
      pTwo.toggleTurn();
      isPlayerOneTurn();
      isPlayerTwoTurn();
      if (gameBoard.gameIsRunning === false) {
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
