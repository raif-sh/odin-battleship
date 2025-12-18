import { Player } from "./modules/player.js";

// Get game type input
const getStartPvpBtn = document.querySelector("#startPvpBtn");
const getStartComputerBtn = document.querySelector("#startComputerBtn");

// Get GUI containers
const startScreen = document.querySelector("#startScreen");
const gui = document.querySelector("#game");
const boardOne = document.querySelector("#boardOne");
const boardTwo = document.querySelector("#boardTwo");
const winnerModal = document.querySelector("#winnerModal");
const winnerMessage = document.querySelector("#winnerMessage");
const restartBtn = document.querySelector("#restartBtn");

let playerOne, playerTwo = null;

// Game type
let pvpGame = false;
let pvcGame = false;
let gameOver = false;

// Valid Ship names ==>
// Carrier
// Battleship
// Destroyer
// Submarine
// Patrol Boat

getStartPvpBtn.addEventListener('click', () => {
    // create pvp players
    playerOne = new Player('human', 1);
    playerTwo = new Player('human', 2);
    console.log(playerTwo)

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

    // Change screen
    startScreen.style.display = "none";
    gui.style.display = "flex";
    pvpGame = true;
    manageTurn()
})

getStartComputerBtn.addEventListener('click', () => {
    // create pvc players
    playerOne = new Player('human', 1);
    playerTwo = new Player('computer', 2);
    console.log(playerTwo)

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

    // Change screen
    startScreen.style.display = "none";
    gui.style.display = "flex";
    pvcGame = true;
    manageTurn()
})

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


// game starts with player one's turn to attack
let playerTurn = 1;

function manageTurn() {
    // Don't manage turns if game is over
    if (gameOver) {
        return;
    }

    if (playerTurn === 1) {
        console.log("player " + playerTurn + " is playing now")
        
        if (pvpGame || pvcGame) {
            boardOne.removeEventListener("click", handlePlayerAttack);
            boardTwo.addEventListener("click", handlePlayerAttack);
        }
    } else if (playerTurn === 2) {
        console.log("player " + playerTurn + " is playing now")
        
        if (pvpGame) {
            boardTwo.removeEventListener("click", handlePlayerAttack);
            boardOne.addEventListener("click", handlePlayerAttack);
        } else if (pvcGame) {
            setTimeout(computerAttack, 1000);
        }
    }
    // switch players turn
    playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
}

function handlePlayerAttack(e) {
    // get click event data
    const input = e.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    const player = input.dataset.player;
    const targetPlayer = player === "1" ? playerOne : playerTwo;

    targetPlayer.gameBoard.receiveAttack(row, col);

    // Check hits array for actual results
    const hitStatus = targetPlayer.gameBoard.hits[row][col];

    if (hitStatus === true) {
        input.textContent = "[ X ]";
        input.classList.add("hit");

        const hitShip = targetPlayer.gameBoard.grid[row][col];
        if (hitShip && hitShip.sunk === true) {
            updateSunkShipDisplay(targetPlayer, hitShip);
            // Check for game over after ship sink
            if (checkGameOver(targetPlayer)) {
                // Game is over, don't continue turn management
                return; 
            }
        }
    } else if (hitStatus === false) {
        input.textContent = "[ O ]";
        input.classList.remove("ship");
        input.classList.add("miss");
    }

    manageTurn()
}

function computerAttack() {
    // Generate random coordinates until finding unattacked cell
    let row, col;
    do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
    } while (playerOne.gameBoard.hits[row][col] !== null)

    console.log(`computer attacks: row ${row}, col ${col}`);

    // process attack
    playerOne.gameBoard.receiveAttack(row, col);

    // Check hit status 
    const hitStatus = playerOne.gameBoard.hits[row][col];

    // find DOM element for this call
    const cellElement = boardOne.querySelector(`[data-row="${row}"][data-col="${col}"]`);

    if (cellElement) {
        if (hitStatus === true) {
            cellElement.textContent = "[ X ]";
            cellElement.classList.add("hit");

            // check if hit ship is sunk
            const hitShip = playerOne.gameBoard.grid[row][col];
            if (hitShip && hitShip.sunk === true) {
                updateSunkShipDisplay(playerOne, hitShip);
                // Check for game over after ship sink
                if (checkGameOver(playerOne)) {
                    return; // Game is over, don't continue turn management
                }
            }
        } else if (hitStatus === false) {
            cellElement.textContent = "[ O ]";
            cellElement.classList.add("miss");
        }
    }
    playerTurn = 1;
    manageTurn()
}


function updateSunkShipDisplay(targetPlayer, sunkShip){
    const grid = targetPlayer.gameBoard.grid;

    // Loop through entire board to find this ship
    for (let row = 0; row < 10; row++) {
        for(let col = 0; col < 10; col++) {
            if (grid[row][col] === sunkShip) {
                // find DOM element for this position
                const boardElement = targetPlayer === playerOne ? boardOne : boardTwo;
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

function checkGameOver(targetPlayer) {
    // Check if all of target player's ships are sunk
    if (targetPlayer.gameBoard.checkSunkStatus()) {
        gameOver = true;

        // Determine the winner, the player who just attacked wins
        let winner;
        // If targetPlayer is playerOne, then playerTwo (the attacker) wins
        if (targetPlayer === playerOne) {
            winner = playerTwo.type === 'computer' ? 'Computer' : 'Player Two';
        }
        // If targetPlayer is playerTwo, then playerOne (the attacker) wins
        else {
            winner = 'Player One';
        }

        showWinner(winner);
        return true;
    }
    return false;
}

function showWinner(winner) {
    // Remove event listeners to prevent further attacks
    boardOne.removeEventListener("click", handlePlayerAttack);
    boardTwo.removeEventListener("click", handlePlayerAttack);

    // Update board indicators to show no active turn
    boardOne.classList.remove("turn");
    boardTwo.classList.remove("turn");

    // Display winner modal
    winnerMessage.textContent = `${winner} wins!`;
    winnerModal.style.display = "block";
}

function restartGame() {
    // Reset game state
    gameOver = false;
    pvpGame = false;
    pvcGame = false;
    playerTurn = 1;
    playerOne = null;
    playerTwo = null;

    // Clear boards
    boardOne.innerHTML = "";
    boardTwo.innerHTML = "";

    // Hide game UI, show start screen
    winnerModal.style.display = "none";
    game.style.display = "none";
    startScreen.style.display = "block";
}

// Add restart button event listener
restartBtn.addEventListener("click", restartGame);

export { manageTurn, pvpGame, pvcGame }