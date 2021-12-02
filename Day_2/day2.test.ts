import { SubmarineP1, SubmarineP2 } from "./day2";

describe("Day 2", () => {
  it("should navigate to the correct spot for part 1", () => {
    const sub = new SubmarineP1();
    sub.moveForward(5);
    sub.moveDown(5);
    sub.moveForward(8);
    sub.moveUp(3);
    sub.moveDown(8);
    sub.moveForward(2);
    expect(sub.horizontal_pos).toEqual(15);
    expect(sub.depth).toEqual(10);
    expect(sub.horizontal_pos * sub.depth).toEqual(150);
  });

  it("should navigate to the correct spot for part 2", () => {
    const sub = new SubmarineP2();
    sub.moveForward(5);
    sub.moveDown(5);
    sub.moveForward(8);
    sub.moveUp(3);
    sub.moveDown(8);
    sub.moveForward(2);
    expect(sub.horizontal_pos).toEqual(15);
    expect(sub.depth).toEqual(60);
    expect(sub.horizontal_pos * sub.depth).toEqual(900);
  });
});
