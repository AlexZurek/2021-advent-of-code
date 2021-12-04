import { calcP1Rates, calcP2Rates } from "./day3";

describe("Day 3", () => {
  const sampleReport = [
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 1, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
  ];

  describe("Part 1", () => {
    it("should calculate gamma and epsilon rate properly with example", () => {
      const rates = calcP1Rates(sampleReport);
      expect(rates.gamma).toEqual(22);
      expect(rates.epsilon).toEqual(9);
    });
  });

  describe("Part 2", () => {
    it("should calculate oxygen and co2 ratings", () => {
      const rates = calcP2Rates(sampleReport);
      expect(rates.oxygen).toEqual(23);
      expect(rates.co2).toEqual(10);
    });
  });
});
