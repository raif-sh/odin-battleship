import { Player } from "./player.js";

// create two players
const playerOne = new Player('real');
const playerTwo = new Player('real');

// Get GUI containers
const gui = document.querySelector("#game");
const boardOne = document.querySelector("#boardOne");
const boardTwo = document.querySelector("#boardTwo");

// function to render boards on html
function renderBoard(boardElement, gameBoard) {
    // Create 10x10 grid of divs
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement("div");
            cell.value = gameBoard.grid[row][col];
            cell.textContent = ""
            boardElement.appendChild(cell);
        }
    }
}

renderBoard(boardOne, playerOne.gameBoard);
renderBoard(boardTwo, playerTwo.gameBoard);

