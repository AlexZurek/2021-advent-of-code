import { readFileSync } from "fs";

/**
 * Reads the data file for the given day of Advent of Code.
 * @param dayNum The desired day (i.e. 1-25)
 * @returns The file as a `string` array
 */
export function parseFile(dayNum: number): string[] {
  const data = readFileSync(`./Day_${dayNum}/data.txt`, "utf-8");
  return data.split("\n").filter((d) => d !== "");
}
