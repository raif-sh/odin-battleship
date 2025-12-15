import { Ship } from './ship.js'

export class Gameboard {
    constructor() {
        this.grid = [];
        this.hits = [];
        for (let i = 0; i < 10; i++) {
            this.grid.push(Array(10).fill(null));
            this.hits.push(Array(10).fill(null));
        }
    }

    placeShip(type, startRow, startColumn, orientation) {
        const shipInfo = this.ship_types.find(ship => ship.name === type);
        if (shipInfo === undefined) {
            return false;
        }
        const shipInstance = new Ship(type, shipInfo["length"]);
        
        if (orientation === 'horizontal') {
            // Check for out of board
            if ((startColumn + shipInfo["length"]) > 10) {
                return false;
            }
            for (let i = 0; i < shipInfo["length"]; i++) {
                // Check for overlap
                if(this.grid[startRow][startColumn + i] !== null) {
                    return false;
                }

                // register ship location
                this.grid[startRow][startColumn + i] = shipInstance;
            }
            return true;
        } else if (orientation === 'vertical') {
            if ((startRow + shipInfo["length"]) > 10) {
                return false;
            }
            for (let i = 0; i < shipInfo["length"]; i++) {
                if(this.grid[startRow + i][startColumn] !== null) {
                    return false;
                } 
                this.grid[startRow + i][startColumn] = shipInstance;
            }
            return true;
        }

        return true;
    }

    // function accepts pair of coordinates
    receiveAttack(row, col) {
        // validate for out of board attacks
        if (row < 0 || row > 9 || col < 0 || col > 9) {
            return false;
        }
        // determine whether attack hit a ship aka null 
        else if(this.grid[row][col] === null) {
            // record coordinates of missed shot, hits is false
            this.hits[row][col] = false;
            return false;
        } else if (this.hits[row][col] === false || this.hits[row][col] === true) {
            // already attacked once
            return false;
        }
        // assign hit to correct ship and record hit
        const attackedShip = this.grid[row][col];
        attackedShip.hit()
        this.hits[row][col] = true;
        return true;
    }
    
    ship_types = [
        {
            id: 1,
            name: "Carrier",
            length: 5,
        },
        {
            id: 2,
            name: "Battleship",
            length: 4,
        },
        {
            id: 3,
            name: "Destroyer",
            length: 3,
        },
        {
            id: 4,
            name: "Submarine",
            length: 3,
        },
        {
            id: 5,
            name: "Patrol Boat",
            length: 2,
        },
    ]

}

