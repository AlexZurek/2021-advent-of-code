import { calcRates } from "./day3";

describe("Day 3", () => {
  describe("calcRates", () => {
    it("should calculate gamma and epsilon rate properly with example", () => {
      const report = [
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

      const rates = calcRates(report);
      expect(rates.gamma).toEqual(22);
      expect(rates.epsilon).toEqual(9);
    });
  });
});
