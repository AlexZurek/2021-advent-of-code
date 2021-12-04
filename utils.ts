import { readFileSync } from "fs";

export function parseFile(filename: string): string[] {
  const data = readFileSync(filename, "utf-8");
  return data.split("\n").filter((d) => d !== "");
}
