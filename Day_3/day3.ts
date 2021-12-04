import { countBy } from "ramda";
import { parseFile } from "../utils";

function buildColumns(report: number[][]): number[][] {
  let dataByColumn: number[][] = [];

  for (let i = 0; i < report[0].length; i++) {
    let column: number[] = [];

    for (let j = 0; j < report.length; j++) {
      column.push(report[j][i]);
    }

    dataByColumn.push(column);
  }

  return dataByColumn;
}

export function calcP1Rates(report: number[][]): {
  gamma: number;
  epsilon: number;
} {
  const columns = buildColumns(report);

  const gammaBinaryNumber = columns
    .map((data) => {
      const analysis = countBy(Math.floor)(data);
      return analysis["0"] > analysis["1"] ? 0 : 1;
    })
    .join("");

  const epsilonBinaryNumber = columns
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

export function calcP2Rates(report: number[][]): {
  oxygen: number;
  co2: number;
} {
  let possibleOxygenNumbers = report;
  let possibleCO2Numbers = report;

  let index = 0;

  while (possibleOxygenNumbers.length > 1) {
    const columns = buildColumns(possibleOxygenNumbers);
    const data = columns[index];
    const analysis = countBy(Math.floor)(data);
    const filterNum = analysis["1"] >= analysis["0"] ? 1 : 0;

    possibleOxygenNumbers = possibleOxygenNumbers.filter(
      (num) => num[index] === filterNum
    );
    index++;
  }

  index = 0;

  while (possibleCO2Numbers.length > 1) {
    const columns = buildColumns(possibleCO2Numbers);
    const data = columns[index];
    const analysis = countBy(Math.floor)(data);
    const filterNum = analysis["0"] <= analysis["1"] ? 0 : 1;

    possibleCO2Numbers = possibleCO2Numbers.filter(
      (num) => num[index] === filterNum
    );
    index++;
  }

  return {
    oxygen: parseInt(possibleOxygenNumbers[0].join(""), 2),
    co2: parseInt(possibleCO2Numbers[0].join(""), 2),
  };
}

const data: number[][] = parseFile(3).map((bin) => {
  const bits = bin.split("");
  return bits.map((b) => +b);
});

const ratesP1 = calcP1Rates(data);
console.log("answer to part 1:", ratesP1.gamma * ratesP1.epsilon);
const ratesP2 = calcP2Rates(data);
console.log("answer to part 2:", ratesP2.oxygen * ratesP2.co2);
