import { parseFile } from "../utils";

export class SubmarineP1 {
  horizontal_pos: number;
  depth: number;

  constructor() {
    this.horizontal_pos = 0;
    this.depth = 0;
  }

  moveForward(num: number) {
    this.horizontal_pos += num;
  }

  moveDown(num: number) {
    this.depth += num;
  }

  moveUp(num: number) {
    this.depth -= num;
  }

  getLocation(): number {
    return this.depth * this.horizontal_pos;
  }
}

export class SubmarineP2 {
  horizontal_pos: number;
  depth: number;
  aim: number;

  constructor() {
    this.horizontal_pos = 0;
    this.depth = 0;
    this.aim = 0;
  }

  moveForward(num: number) {
    this.horizontal_pos += num;
    this.depth += this.aim * num;
  }

  moveDown(num: number) {
    this.aim += num;
  }

  moveUp(num: number) {
    this.aim -= num;
  }

  getLocation(): number {
    return this.depth * this.horizontal_pos;
  }
}

type Direction = "up" | "down" | "forward";
type DirectionChange = {
  direction: Direction;
  amount: number;
};

function processDataP1(changes: DirectionChange[]): number {
  const sub = new SubmarineP1();
  changes.forEach((change) => {
    switch (change.direction) {
      case "up":
        sub.moveUp(change.amount);
        break;
      case "down":
        sub.moveDown(change.amount);
        break;
      case "forward":
        sub.moveForward(change.amount);
        break;
    }
  });

  return sub.getLocation();
}

function processDataP2(changes: DirectionChange[]): number {
  const sub = new SubmarineP2();
  changes.forEach((change) => {
    switch (change.direction) {
      case "up":
        sub.moveUp(change.amount);
        break;
      case "down":
        sub.moveDown(change.amount);
        break;
      case "forward":
        sub.moveForward(change.amount);
        break;
    }
  });

  return sub.getLocation();
}

const data: DirectionChange[] = parseFile("./Day_2/data.txt").map((d) => {
  const parts = d.split(" ");
  return { direction: parts[0] as Direction, amount: +parts[1] };
});

console.log("Answer to Part 1:", processDataP1(data));
console.log("Answer to Part 2:", processDataP2(data));
