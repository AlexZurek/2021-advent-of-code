import { Board, Space } from "./day4";

describe("Day 4", () => {
  describe("Part 1", () => {
    it("should create the board properly", () => {
      const rows = [
        [14, 21, 17, 24, 4],
        [10, 16, 15, 9, 19],
        [18, 8, 23, 26, 20],
        [22, 11, 13, 6, 5],
        [2, 0, 12, 3, 7],
      ];

      const moves = [
        7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22,
        18, 20, 8, 19, 3, 26, 1,
      ];

      const expectedBoard: Space[][] = [
        [
          { v: 14, m: false },
          { v: 21, m: false },
          { v: 17, m: false },
          { v: 24, m: false },
          { v: 4, m: false },
        ],
        [
          { v: 10, m: false },
          { v: 16, m: false },
          { v: 15, m: false },
          { v: 9, m: false },
          { v: 19, m: false },
        ],
        [
          { v: 18, m: false },
          { v: 8, m: false },
          { v: 23, m: false },
          { v: 26, m: false },
          { v: 20, m: false },
        ],
        [
          { v: 22, m: false },
          { v: 11, m: false },
          { v: 13, m: false },
          { v: 6, m: false },
          { v: 5, m: false },
        ],
        [
          { v: 2, m: false },
          { v: 0, m: false },
          { v: 12, m: false },
          { v: 3, m: false },
          { v: 7, m: false },
        ],
      ];
      const board = new Board(rows, moves);
      const result = board.getCurrentBoardState();
      expect(result.spaces).toEqual(expectedBoard);
      expect(result.remainingMoves).toEqual(moves);
    });
  });

  describe("Part 2", () => {});
});
