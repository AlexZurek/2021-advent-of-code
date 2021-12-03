import { readFileSync } from "fs";
import { countBy, max } from "ramda";

function getData(): number[][] {
  const data = readFileSync("./Day_3/data.txt", "utf-8");
  return data
    .split("\n")
    .filter((d) => d !== "")
    .map((bin) => {
      const bits = bin.split("");
      return bits.map((b) => +b);
    });
}

export function calcRates(report: number[][]): {
  gamma: number;
  epsilon: number;
} {
  let allGammaData: number[][] = [];

  for (let i = 0; i < report[0].length; i++) {
    let gammaData: number[] = [];

    for (let j = 0; j < report.length; j++) {
      gammaData.push(report[j][i]);
    }

    allGammaData.push(gammaData);
  }

  const gammaBinaryNumber = allGammaData
    .map((data) => {
      const analysis = countBy(Math.floor)(data);
      return analysis["0"] > analysis["1"] ? 0 : 1;
    })
    .join("");

  const epsilonBinaryNumber = allGammaData
    .map((data) => {
      const analysis = countBy(Math.floor)(data);
      return analysis["0"] > analysis["1"] ? 1 : 0;
    })
    .join("");

  return {
    gamma: parseInt(gammaBinaryNumber, 2),
    epsilon: parseInt(epsilonBinaryNumber, 2),
  };
}

const data = getData();
const rates = calcRates(data);
console.log("answer to part 1:", rates.gamma * rates.epsilon);
