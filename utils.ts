import { readFileSync } from "fs";

export function parseFile(dayNum: number): string[] {
  const data = readFileSync(`./Day_${dayNum}/data.txt`, "utf-8");
  return data.split("\n").filter((d) => d !== "");
}
