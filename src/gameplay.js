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

// Ship placement elements
const shipPlacement = document.querySelector("#shipPlacement");
const placementTitle = document.querySelector("#placementTitle");
const currentShipName = document.querySelector("#currentShipName");
const currentShipLength = document.querySelector("#currentShipLength");
const rotateBtn = document.querySelector("#rotateBtn");
const randomPlaceBtn = document.querySelector("#randomPlaceBtn");
const startGameBtn = document.querySelector("#startGameBtn");
const placementGrid = document.querySelector("#placementGrid");

let playerOne, playerTwo = null;

// Game type
let pvpGame = false;
let pvcGame = false;
let gameOver = false;

// Ship placement state
let currentShipIndex = 0;
let currentOrientation = 'horizontal';
let currentPlacingPlayer = null;
let shipsToPlace = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Destroyer", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Patrol Boat", length: 2 }
];

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
    pvpGame = true;

    // Start ship placement for player one
    startShipPlacement(playerOne, "Player One: Place Your Ships");
})

getStartComputerBtn.addEventListener('click', () => {
    // create pvc players
    playerOne = new Player('human', 1);
    playerTwo = new Player('computer', 2);
    pvcGame = true;

    // Start ship placement for player one (computer ships will be placed automatically)
    startShipPlacement(playerOne, "Place Your Ships");
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

// ========== SHIP PLACEMENT FUNCTIONS ==========

function startShipPlacement(player, title) {
    currentPlacingPlayer = player;
    currentShipIndex = 0;
    currentOrientation = 'horizontal';

    // Update UI
    placementTitle.textContent = title;
    startScreen.style.display = "none";
    shipPlacement.style.display = "flex";

    // Render placement grid
    renderPlacementGrid();

    // Update current ship info
    updateCurrentShipInfo();

    // Setup event listeners
    setupPlacementListeners();
}

function renderPlacementGrid() {
    placementGrid.innerHTML = "";

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement("div");
            cell.dataset.row = row;
            cell.dataset.col = col;
            placementGrid.appendChild(cell);
        }
    }
}

function updateCurrentShipInfo() {
    if (currentShipIndex < shipsToPlace.length) {
        const currentShip = shipsToPlace[currentShipIndex];
        currentShipName.textContent = currentShip.name;
        currentShipLength.textContent = currentShip.length;
        startGameBtn.style.display = "none";
    } else {
        currentShipName.textContent = "All ships placed!";
        currentShipLength.textContent = "";
        startGameBtn.style.display = "block";
    }
}

function setupPlacementListeners() {
    placementGrid.addEventListener('mouseover', handlePlacementHover);
    placementGrid.addEventListener('mouseout', handlePlacementOut);
    placementGrid.addEventListener('click', handlePlacementClick);
    rotateBtn.addEventListener('click', handleRotate);
    randomPlaceBtn.addEventListener('click', handleRandomPlacement);
    startGameBtn.addEventListener('click', startGameAfterPlacement);
}

function removePlacementListeners() {
    placementGrid.removeEventListener('mouseover', handlePlacementHover);
    placementGrid.removeEventListener('mouseout', handlePlacementOut);
    placementGrid.removeEventListener('click', handlePlacementClick);
    rotateBtn.removeEventListener('click', handleRotate);
    randomPlaceBtn.removeEventListener('click', handleRandomPlacement);
    startGameBtn.removeEventListener('click', startGameAfterPlacement);
}

function handlePlacementHover(e) {
    if (currentShipIndex >= shipsToPlace.length) return;

    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const currentShip = shipsToPlace[currentShipIndex];

    previewShipPlacement(row, col, currentShip.length, currentOrientation);
}

function handlePlacementOut() {
    clearShipPreview();
}

function previewShipPlacement(row, col, length, orientation) {
    clearShipPreview();

    const cells = [];
    if (orientation === 'horizontal') {
        for (let i = 0; i < length; i++) {
            if (col + i < 10) {
                const cell = placementGrid.querySelector(`[data-row="${row}"][data-col="${col + i}"]`);
                if (cell) cells.push(cell);
            }
        }
    } else {
        for (let i = 0; i < length; i++) {
            if (row + i < 10) {
                const cell = placementGrid.querySelector(`[data-row="${row + i}"][data-col="${col}"]`);
                if (cell) cells.push(cell);
            }
        }
    }

    if (cells.length === length && canPlaceShip(row, col, length, orientation)) {
        cells.forEach(cell => cell.classList.add('ship-preview'));
    } else {
        cells.forEach(cell => cell.classList.add('invalid-placement'));
    }
}

function clearShipPreview() {
    placementGrid.querySelectorAll('.ship-preview, .invalid-placement').forEach(cell => {
        cell.classList.remove('ship-preview', 'invalid-placement');
    });
}

function canPlaceShip(row, col, length, orientation) {
    if (orientation === 'horizontal') {
        if (col + length > 10) return false;
        for (let i = 0; i < length; i++) {
            if (currentPlacingPlayer.gameBoard.grid[row][col + i] !== null) return false;
        }
    } else {
        if (row + length > 10) return false;
        for (let i = 0; i < length; i++) {
            if (currentPlacingPlayer.gameBoard.grid[row + i][col] !== null) return false;
        }
    }
    return true;
}

function handlePlacementClick(e) {
    if (currentShipIndex >= shipsToPlace.length) return;

    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const currentShip = shipsToPlace[currentShipIndex];

    if (canPlaceShip(row, col, currentShip.length, currentOrientation)) {
        placeShipOnBoard(row, col, currentShip.name, currentShip.length, currentOrientation);
        currentShipIndex++;
        updateCurrentShipInfo();
        clearShipPreview();
        updatePlacedShipsDisplay();
    }
}

function placeShipOnBoard(row, col, shipName, length, orientation) {
    currentPlacingPlayer.gameBoard.placeShip(shipName, row, col, orientation);
}

function updatePlacedShipsDisplay() {
    // Clear previous ship displays
    placementGrid.querySelectorAll('.ship-placed').forEach(cell => {
        cell.classList.remove('ship-placed');
    });

    // Show all placed ships
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (currentPlacingPlayer.gameBoard.grid[row][col] !== null) {
                const cell = placementGrid.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                if (cell) {
                    cell.classList.add('ship-placed');
                }
            }
        }
    }
}

function handleRotate() {
    currentOrientation = currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';
}

function handleRandomPlacement() {
    // Clear existing ships
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            currentPlacingPlayer.gameBoard.grid[i][j] = null;
        }
    }

    // Place all ships randomly
    for (let ship of shipsToPlace) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100) {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';

            if (canPlaceShip(row, col, ship.length, orientation)) {
                placeShipOnBoard(row, col, ship.name, ship.length, orientation);
                placed = true;
            }
            attempts++;
        }
    }

    currentShipIndex = shipsToPlace.length;
    updateCurrentShipInfo();
    updatePlacedShipsDisplay();
}

function startGameAfterPlacement() {
    removePlacementListeners();
    shipPlacement.style.display = "none";

    if (pvcGame && currentPlacingPlayer === playerOne) {
        // Place computer ships randomly
        currentPlacingPlayer = playerTwo;
        for (let ship of shipsToPlace) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 100) {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';

                if (canPlaceComputerShip(row, col, ship.length, orientation)) {
                    playerTwo.gameBoard.placeShip(ship.name, row, col, orientation);
                    placed = true;
                }
                attempts++;
            }
        }
    } else if (pvpGame && currentPlacingPlayer === playerOne) {
        // Start placement for player two
        startShipPlacement(playerTwo, "Player Two: Place Your Ships");
        return;
    }

    // Both players have placed ships, start the game
    startBattle();
}

function canPlaceComputerShip(row, col, length, orientation) {
    if (orientation === 'horizontal') {
        if (col + length > 10) return false;
        for (let i = 0; i < length; i++) {
            if (playerTwo.gameBoard.grid[row][col + i] !== null) return false;
        }
    } else {
        if (row + length > 10) return false;
        for (let i = 0; i < length; i++) {
            if (playerTwo.gameBoard.grid[row + i][col] !== null) return false;
        }
    }
    return true;
}

function startBattle() {
    // Create boards for both players
    renderBoard(boardOne, playerOne);
    renderBoard(boardTwo, playerTwo);

    // Show game screen
    gui.style.display = "flex";

    // Start first turn
    manageTurn();
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

    // Reset ship placement state
    currentShipIndex = 0;
    currentOrientation = 'horizontal';
    currentPlacingPlayer = null;

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