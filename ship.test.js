import { ship } from "./ship.js";

test("function imported", () => {
    expect(ship()).toBe(true);
})