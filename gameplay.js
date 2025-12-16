import { Player } from "./player.js";

// create two players
const playerOne = new Player('real', 1);
const playerTwo = new Player('real', 2);

// Get GUI containers
const gui = document.querySelector("#game");
const boardOne = document.querySelector("#boardOne");
const boardTwo = document.querySelector("#boardTwo");

// function to render boards on html
function renderBoard(boardElement, player) {
    // Create 10x10 grid of divs
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement("div");

            // Store row and col as data attributes
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.dataset.player = player.number;
            
            cell.textContent = ""
            // Show ships on player board
            // if(player.gameBoard.grid[row][col] !== null){
            //     cell.textContent = "S";
            //     cell.classList.add("ship");
            // }

            boardElement.appendChild(cell);
        }
    }
}

// Valid Ship names ==>
// Carrier
// Battleship
// Destroyer
// Submarine
// Patrol Boat

// TEMP - Placing ships manually for player one
playerOne.gameBoard.placeShip("Carrier",0,0,"horizontal");
playerOne.gameBoard.placeShip("Battleship",1,0,"vertical");
playerOne.gameBoard.placeShip("Destroyer",1,1,"vertical");
playerOne.gameBoard.placeShip("Submarine",2,2,"horizontal");
playerOne.gameBoard.placeShip("Patrol Boat",0,9,"vertical");
// TEMP - Placing ships manually for player two
playerTwo.gameBoard.placeShip("Carrier",0,0,"horizontal");
playerTwo.gameBoard.placeShip("Battleship",1,0,"vertical");
playerTwo.gameBoard.placeShip("Destroyer",1,1,"vertical");
playerTwo.gameBoard.placeShip("Submarine",2,2,"horizontal");
playerTwo.gameBoard.placeShip("Patrol Boat",0,9,"vertical");

// Creating board for two players
renderBoard(boardOne, playerOne);
renderBoard(boardTwo, playerTwo);

// game starts with player one's turn to attack
let playerTurn = 1;

function manageTurn() {
    if (playerTurn === 1) {
        console.log("player " + playerTurn + " is playing now")
        
        boardOne.removeEventListener("click", manageAttack);
        boardTwo.addEventListener("click", manageAttack);
    } else if (playerTurn === 2) {
        console.log("player " + playerTurn + " is playing now")
        
        boardTwo.removeEventListener("click", manageAttack);
        boardOne.addEventListener("click", manageAttack);
    }
    // switch players turn
    playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
}

function manageAttack(e) {
    const input = e.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    const player = input.dataset.player;

    const targetPlayer = player === "1" ? playerTwo : playerOne;
    
    targetPlayer.gameBoard.receiveAttack(row, col);
    
    // Check hits array for actual results
    const hitStatus = targetPlayer.gameBoard.hits[row][col];
    
    if (hitStatus === true) {
        input.textContent = "[ X ]";
        input.classList.add("hit");

        const hitShip = targetPlayer.gameBoard.grid[row][col];
        if (hitShip && hitShip.sunk === true) {
            updateSunkShipDisplay(targetPlayer, hitShip);
        }
    } else if (hitStatus === false) {
        input.textContent = "[ O ]";
        input.classList.remove("ship");
        input.classList.add("miss");
    }

    manageTurn()
}

function updateSunkShipDisplay(targetPlayer, sunkShip){
    const grid = targetPlayer.gameBoard.grid;
    const hits = targetPlayer.gameBoard.hits;

    // Loop through entire board to find this ship
    for (let row = 0; row < 10; row++) {
        for(let col = 0; col < 10; col++) {
            if (grid[row][col] === sunkShip) {
                // find DOM element for this position
                const boardElement = targetPlayer === playerOne ? boardTwo : boardOne;
                const cellElement = boardElement.querySelector(
                    `[data-row="${row}"][data-col="${col}"]`
                );

                if (cellElement) {
                    cellElement.textContent = "🏴‍☠️";
                    cellElement.classList.remove("hit");
                    cellElement.classList.add("sunk");
                }
            }
        }
    }
}

manageTurn()