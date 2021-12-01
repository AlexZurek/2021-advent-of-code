import {
  analyzeDepths,
  didDepthIncrease,
  getData,
  processDepthDataP1,
  processDepthDataP2,
} from "./day-1";

describe("Day 1", () => {
  describe("getData", () => {
    it("should return a list of 2000 records", async () => {
      const fileData = getData();
      expect(fileData.length).toEqual(2000);
    });

    it("should convert data to numbers", async () => {
      const fileData = getData();
      expect(typeof fileData[0]).toEqual("number");
    });
  });

  describe("compareDepths", () => {
    it("should return false when depth decreases", () => {
      const result = didDepthIncrease({ current: 190, previous: 200 });
      expect(result).toEqual(false);
    });

    it("should return false when previous depth equals current depth", () => {
      const result = didDepthIncrease({ current: 200, previous: 200 });
      expect(result).toEqual(false);
    });

    it("should return true when depth increases", () => {
      const result = didDepthIncrease({ current: 200, previous: 190 });
      expect(result).toEqual(true);
    });
  });

  describe("processDepthDataP1", () => {
    it("should handle a list with multiple depths", () => {
      const result = processDepthDataP1([199, 200, 208, 210, 200]);
      expect(result).toEqual([true, true, true, false]);
    });
  });

  describe("processDepthDataP2", () => {
    it("should split the values properly into the window", () => {
      const result = processDepthDataP2([
        199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
      ]);

      expect(result).toEqual([true, false, false, true, true, true, true]);
    });
  });

  describe("analyzeDepths", () => {
    it("should handle an empty list", () => {
      const result = analyzeDepths([]);
      expect(result.numIncrease).toEqual(0);
      expect(result.numDecrease).toEqual(0);
    });

    it("should report number of increases", () => {
      const result = analyzeDepths([true, true]);
      expect(result.numIncrease).toEqual(2);
      expect(result.numDecrease).toEqual(0);
    });

    it("should report number of decreases", () => {
      const result = analyzeDepths([false, false]);
      expect(result.numIncrease).toEqual(0);
      expect(result.numDecrease).toEqual(2);
    });
  });
});
