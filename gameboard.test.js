import { Gameboard } from './gameboard.js'


it("create new empty board with 10 x 10 grid", () => {
    const BoardCreated = new Gameboard();
    expect(BoardCreated.grid.length).toBe(10);
    expect(BoardCreated.grid[0].length).toBe(10);
})

it("Ship type input should be a valid ship name", () => {
    const board = new Gameboard();
    expect(board.placeShip('Wrong Name', 1, 1, 'horizontal')).toEqual(false);
})

it("place ships at specific coordinates on both orientations", () => {
    const board = new Gameboard();

    // place('name of ship', start coordinate, horizontal/vertical)
    expect(board.placeShip('Battleship', 1, 1, 'horizontal')).toEqual(true);
    expect(board.placeShip('Submarine', 2, 2, 'vertical')).toEqual(true);
})

it("Check for overlap, not place if any ship conflicts with existing ship", () => {
    const board = new Gameboard();

    expect(board.placeShip('Battleship', 0, 0, 'horizontal')).toEqual(true);
    expect(board.placeShip('Submarine', 0, 1, 'vertical')).toEqual(false);

})

it("No out of board placements", () => {
    const board = new Gameboard();
    expect(board.placeShip('Carrier', 8, 8, 'horizontal')).toEqual(false);

})