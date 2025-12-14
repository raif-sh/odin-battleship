import { Ship } from './ship.js'

export class Gameboard {
    constructor() {
        this.grid = [];
        for (let i = 0; i < 10; i++) {
            this.grid.push(Array(10).fill(null));
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

