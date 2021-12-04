import { drop, zip, flatten, sum } from "ramda";
import { parseFile } from "../utils";

type DepthAnalysis = {
  numIncrease: number;
  numDecrease: number;
};

export function didDepthIncrease(depths: {
  previous: number;
  current: number;
}): boolean {
  return depths.current > depths.previous;
}

export function processDepthDataP1(data: number[]): boolean[] {
  const pairs = zip(data, drop(1, data));
  return pairs.map(([a, b]) => didDepthIncrease({ current: b, previous: a }));
}

export function processDepthDataP2(data: number[]): boolean[] {
  const windows = zip(zip(data, drop(1, data)), drop(2, data)).map(flatten);
  const sums = windows.map(sum);
  const pairs = zip(sums, drop(1, sums));
  return pairs.map(([a, b]) => didDepthIncrease({ current: b, previous: a }));
}

export function analyzeDepths(data: boolean[]): DepthAnalysis {
  return {
    numIncrease: data.filter((increased) => increased).length,
    numDecrease: data.filter((increased) => !increased).length,
  };
}

const numbers = parseFile(1).map((d) => +d);

const processed1 = processDepthDataP1(numbers);
const analysis1 = analyzeDepths(processed1);
console.log("Answer for Part 1:", analysis1.numIncrease);

const processed2 = processDepthDataP2(numbers);
const analysis2 = analyzeDepths(processed2);
console.log("Answer for Part 2:", analysis2.numIncrease);
