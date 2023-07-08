const topA = document.querySelector(".top_a");
const topB = document.querySelector(".top_b");
const topC = document.querySelector(".top_c");
const midA = document.querySelector(".mid_a");
const midB = document.querySelector(".mid_b");
const midC = document.querySelector(".mid_c");
const botA = document.querySelector(".bot_a");
const botB = document.querySelector(".bot_b");
const botC = document.querySelector(".bot_c");

const game = {
  board: ["", "", "", "", "", "", "", "", ""],
};

var gameBoard = (function () {
  function publicMethod() {
    console.log("Tesat");
  }

  return {
    publicMethod: publicMethod,
  };
})();

gameBoard.publicMethod();

//PLAYER 1//
// const playerOneFactory = score;

topA.textContent = "X";


function playerClick() {
  if 
}