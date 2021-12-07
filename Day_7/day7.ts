import { reduce } from "ramda";
import { parseFile } from "../utils";

function findBestPositionP1(positions: number[]): number {
  let bestFuelCost = 0;

  for (let index = 0; index < positions.length; index++) {
    const fuelCost = reduce<number, number>(
      (acc, elem) => acc + Math.abs(elem - index),
      0,
      positions
    );
    if (bestFuelCost === 0 || fuelCost < bestFuelCost) {
      bestFuelCost = fuelCost;
    }
  }

  return bestFuelCost;
}

function findBestPositionP2(positions: number[]): number {
  let bestFuelCost = 0;

  for (let index = 0; index < positions.length; index++) {
    const fuelCost = reduce<number, number>(
      (acc, elem) => {
        const distance = Math.abs(elem - index);
        const partialSum = (distance * (distance + 1)) / 2;
        return acc + partialSum;
      },
      0,
      positions
    );
    if (bestFuelCost === 0 || fuelCost < bestFuelCost) {
      bestFuelCost = fuelCost;
    }
  }

  return bestFuelCost;
}

// const positions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
const positions = parseFile(7).flatMap((d) => d.split(",").map((p) => +p));

const bestCostP1 = findBestPositionP1(positions);
console.log("Part 1:", bestCostP1);

const bestCostP2 = findBestPositionP2(positions);
console.log("Part 2:", bestCostP2);
