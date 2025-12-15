import { Gameboard } from "./gameboard.js"

export class Player {
    constructor(type) {
        this.type = type;
        this.gameBoard = new Gameboard()
    }
}