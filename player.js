import { Gameboard } from "./gameboard.js"

export class Player {
    constructor(type, number) {
        this.type = type;
        this.number = number;
        this.gameBoard = new Gameboard();
    }
}