// exponential growth
// each fish creates a new fish every 7 days
// not synchronized between lanternfish
// fish represented as number of days until creating another fish
// each fish gets an additional 2 days on its first cycle

/**
 * 
    After one day, its internal timer would become 2.
    After another day, its internal timer would become 1.
    After another day, its internal timer would become 0.
    After another day, its internal timer would reset to 6, and it would create a new lanternfish with an internal timer of 8.
    After another day, the first lanternfish would have an internal timer of 5, and the second lanternfish would have an internal timer of 7.
 */

import { parseFile } from "../utils";

// let fish = [3, 4, 3, 1, 2];
const fish = parseFile(6).flatMap((d) => d.split(",").map((f) => +f));

function waitDays(days: number, fish: number[]) {
  let fishMap = new Map<string, number>();
  fishMap.set("0", fish.filter((f) => f === 0).length);
  fishMap.set("1", fish.filter((f) => f === 1).length);
  fishMap.set("2", fish.filter((f) => f === 2).length);
  fishMap.set("3", fish.filter((f) => f === 3).length);
  fishMap.set("4", fish.filter((f) => f === 4).length);
  fishMap.set("5", fish.filter((f) => f === 5).length);
  fishMap.set("6", fish.filter((f) => f === 6).length);
  fishMap.set("7", fish.filter((f) => f === 7).length);
  fishMap.set("8", fish.filter((f) => f === 8).length);

  for (let index = 0; index < days; index++) {
    let newFishMap = new Map<string, number>();
    newFishMap.set("0", fishMap.get("1") ?? 0);
    newFishMap.set("1", fishMap.get("2") ?? 0);
    newFishMap.set("2", fishMap.get("3") ?? 0);
    newFishMap.set("3", fishMap.get("4") ?? 0);
    newFishMap.set("4", fishMap.get("5") ?? 0);
    newFishMap.set("5", fishMap.get("6") ?? 0);
    newFishMap.set("6", (fishMap.get("7") ?? 0) + (fishMap.get("0") ?? 0));
    newFishMap.set("7", fishMap.get("8") ?? 0);
    newFishMap.set("8", fishMap.get("0") ?? 0);
    fishMap = newFishMap;
  }

  return fishMap;
}

const fishMapP1 = waitDays(80, fish);
let totalFishP1 = 0;
fishMapP1.forEach((v, k) => (totalFishP1 += v));
console.log("total fish after 80 days", totalFishP1);

const fishMapP2 = waitDays(256, fish);
let totalFishP2 = 0;
fishMapP2.forEach((v, k) => (totalFishP2 += v));
console.log("total fish after 256 days", totalFishP2);
