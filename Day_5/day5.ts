import { clone, countBy, filter, flatten, join, min } from "ramda";
import { parseFile } from "../utils";

type Point = { x: number; y: number };

export function createGrid(size: number): number[][] {
  return Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));
}

export function processLine(
  ventMap: number[][],
  start: Point,
  end: Point
): void {
  // console.log("start point", start);
  // console.log("end point", end);

  const xDiff = Math.abs(end.x - start.x);
  const yDiff = Math.abs(end.y - start.y);

  if (xDiff > 0 && yDiff > 0) {
    const xDirection = start.x > end.x ? -1 : 1;
    const yDirection = start.y > end.y ? -1 : 1;

    for (let index = 0; index <= xDiff; index++) {
      // console.log(
      //   "processing",
      //   start.x + index * xDirection,
      //   start.y + index * yDirection
      // );
      ventMap[start.x + index * xDirection][start.y + index * yDirection] =
        ventMap[start.x + index * xDirection][start.y + index * yDirection] + 1;
    }
  } else if (xDiff > 0) {
    const startPoint = min(start.x, end.x);

    for (let index = 0; index <= xDiff; index++) {
      ventMap[startPoint + index][start.y] =
        ventMap[startPoint + index][start.y] + 1;
    }
  } else if (yDiff > 0) {
    const startPoint = min(start.y, end.y);

    for (let index = 0; index <= yDiff; index++) {
      // console.log("Updating spot", start.x, startPoint + index);

      ventMap[start.x][startPoint + index] =
        ventMap[start.x][startPoint + index] + 1;

      // console.log(ventMap.map((row) => row.join(",")));
    }
  }
}
const example = [
  "0,9 -> 5,9",
  "8,0 -> 0,8",
  "9,4 -> 3,4",
  "2,2 -> 2,1",
  "7,0 -> 7,4",
  "6,4 -> 2,0",
  "0,9 -> 2,9",
  "3,4 -> 1,4",
  "0,0 -> 8,8",
  "5,5 -> 8,2",
];

// const data: { start: Point; end: Point }[] = example.map((d) => {
const data: { start: Point; end: Point }[] = parseFile(5).map((d) => {
  const parts = d.split(" -> ").flatMap((p) => p.split(","));
  return {
    start: { x: +parts[1], y: +parts[0] },
    end: { x: +parts[3], y: +parts[2] },
  };
});

let ventMap = createGrid(1000);

data.forEach((d) => {
  processLine(ventMap, d.start, d.end);
});

console.log(filter((p) => p > 1, flatten(ventMap)).length);
// console.log(ventMap.map((row) => row.join(",")));
