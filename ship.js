export class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits_taken = 0;
        this.sunk = false;
    }

    hit() {
        if (this.isSunk() === true) {
            return false;
        }
        
        this.hits_taken++;
        return true;
    }

    isSunk() {
        if (this.length === this.hits_taken) {
            return this.sunk = true;
        }
        return false;
    }
}