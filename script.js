const topA = document.querySelector(".top_a");
// const topB = document.querySelector(".top_b");
// const topC = document.querySelector(".top_c");
// const midA = document.querySelector(".mid_a");
// const midB = document.querySelector(".mid_b");
// const midC = document.querySelector(".mid_c");
// const botA = document.querySelector(".bot_a");
// const botB = document.querySelector(".bot_b");
// const botC = document.querySelector(".bot_c");

const cells = document.querySelectorAll(".cell");

// var gameBoard = (function () {
//   const game = {
//     board: ["x", "0", "x", "x", "x", "0", "0", "x", "x"],
//   };

//   function updateBoard() {
//     topA.textContent = game.board[0];
//     topB.textContent = game.board[1];
//     topC.textContent = game.board[2];
//     midA.textContent = game.board[3];
//     midB.textContent = game.board[4];
//     midC.textContent = game.board[5];
//     botA.textContent = game.board[6];
//     botB.textContent = game.board[7];
//     botC.textContent = game.board[8];
//   }

//   return {
//     updateBoard: updateBoard,
//     game: game,
//   };
// })();

// //PLAYER 1//
// var playerOneFactory = (function () {
//   var playerOnescore = 0;
//   var playerOneTurn = true;
//   function click() {
//     if (playerOneTurn === true) {
//       console.log("p1 working");
//       playerOneTurn = false;
//       playerTwoFactory.playerTwoTurn = true;
//     }
//   }

//   return {
//     playerOnescore: playerOnescore,
//     playerOneTurn: playerOneTurn,
//     click: click,
//   };
// })();

// //PLAYER 2//
// var playerTwoFactory = (function () {
//   var playerTwoscore = 0;
//   var playerTwoTurn = true;
//   function click() {
//     if (playerTwoTurn === true) {
//       console.log("p2 working");
//       playerTwoTurn = false;
//       playerOneFactory.playerOneTurn = true;
//     }
//   }
//   return {
//     playerTwoscore: playerTwoscore,
//     playerTwoTurn: playerTwoTurn,
//   };
// })();

console.log(cells);
