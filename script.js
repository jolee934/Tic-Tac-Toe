const topA = document.querySelector(".top_a");
const topB = document.querySelector(".top_b");
const topC = document.querySelector(".top_c");
const midA = document.querySelector(".mid_a");
const midB = document.querySelector(".mid_b");
const midC = document.querySelector(".mid_c");
const botA = document.querySelector(".bot_a");
const botB = document.querySelector(".bot_b");
const botC = document.querySelector(".bot_c");

const cells = document.querySelectorAll(".cell");

var gameBoard = (function () {
  const game = {
    board: ["x", "0", "x", "x", "x", "0", "0", "x", "x"],
  };

  function updateBoard() {
    cells.forEach((cell) => {
      const i = cell.dataset.index;
      cell.textContent = game.board[i];
    });
  }

  return {
    updateBoard: updateBoard,
    game: game,
  };
})();

gameBoard.updateBoard();

function click() {
  console.log("clicked");
}

cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    const clickedCell = e.target;
    if (clickedCell.classList.contains("top_a")) {
      gameBoard.game.board[0] = "A";
      gameBoard.updateBoard();
    }
    if (clickedCell.classList.contains("top_b")) {
      gameBoard.game.board[1] = "B";
      gameBoard.updateBoard();
    }
    if (clickedCell.classList.contains("top_c")) {
      gameBoard.game.board[2] = "C";
      gameBoard.updateBoard();
    }
    if (clickedCell.classList.contains("mid_a")) {
      gameBoard.game.board[3] = "D";
      gameBoard.updateBoard();
    }
    if (clickedCell.classList.contains("mid_b")) {
      gameBoard.game.board[4] = "E";
      gameBoard.updateBoard();
    }
    if (clickedCell.classList.contains("mid_c")) {
      gameBoard.game.board[5] = "F";
      gameBoard.updateBoard();
    }
  });
});
