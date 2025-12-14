import { Ship } from "./ship.js";

const shipOfOne = new Ship(1)
const shipOfThree = new Ship(3)
const shipOfFive = new Ship(5)

it("ship hit registers damage and sinks and takes no more damage", () => {
    expect(shipOfOne.hit()).toBe(true);
    expect(shipOfOne.isSunk()).toBe(true);
    expect(shipOfOne.hit()).toBe(false);
})

it("check if ship with len 3 with no hits is sunken", () => {
    expect(shipOfThree.isSunk()).toBe(false);
    expect(shipOfThree.hits_taken).toBe(0);
})

it("ship properly tracks how many hits it has taken", () => {
    expect(shipOfFive.hit()).toBe(true);
    expect(shipOfFive.hit()).toBe(true);
    expect(shipOfFive.hit()).toBe(true);
    expect(shipOfFive.hit()).toBe(true);
    expect(shipOfFive.hit()).toBe(true);
    expect(shipOfFive.hits_taken).toBe(5);
    expect(shipOfFive.hit()).toBe(false);

})