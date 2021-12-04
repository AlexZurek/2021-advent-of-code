import {
  all,
  any,
  drop,
  filter,
  flatten,
  last,
  map,
  none,
  reduce,
  take,
} from "ramda";
import { parseFile } from "../utils";

export type Space = {
  v: number;
  m: boolean;
};

export class Board {
  private rows: Space[][];
  private columns: Space[][];
  private lastNumCalled: number;
  private upcomingMoves: number[];

  constructor(rows: number[][], moves: number[]) {
    this.rows = rows.map((row) => row.map((s) => ({ v: s, m: false })));
    this.upcomingMoves = moves;

    let columns: Space[][] = [];

    this.rows[0].forEach((s, i) => {
      let column: Space[] = [];
      this.rows.forEach((row, j) => {
        column.push(this.rows[j][i]);
      });

      columns.push(column);
    });

    this.columns = columns;
    this.lastNumCalled = 0;
  }

  hasMovesRemaining(): boolean {
    return this.upcomingMoves.length > 0;
  }

  getCurrentBoardState(): { spaces: Space[][]; remainingMoves: number[] } {
    return { spaces: this.rows, remainingMoves: this.upcomingMoves };
  }

  processNextMove() {
    const num = this.upcomingMoves[0];
    this.lastNumCalled = num;

    this.rows.forEach((row) =>
      row.forEach((s) => {
        if (s.v === num) {
          s.m = true;
        }
      })
    );

    this.columns.forEach((col) =>
      col.forEach((s) => {
        if (s.v === num) {
          s.m = true;
        }
      })
    );

    this.upcomingMoves = drop(1, this.upcomingMoves);
  }

  calcPoints() {
    const unMarkedSpaces = filter((space) => !space.m, flatten(this.rows));
    const boardPoints = reduce<Space, number>(
      (total, space) => total + space.v,
      0,
      unMarkedSpaces
    );
    return boardPoints * this.lastNumCalled;
  }

  checkHasWon() {
    return (
      any((row) => all((space) => space.m, row), this.rows) ||
      any((col) => all((space) => space.m, col), this.columns)
    );
  }
}

function processFile(): { boards: Board[]; numRounds: number } {
  const fileData = parseFile(4);
  let data = fileData;
  const upcomingMoves = data[0].split(",").map((m) => +m);
  data = drop(1, data);

  let boardValues: number[][][] = [];
  let boards: Board[] = [];

  while (data.length > 0) {
    boardValues.push(
      take(5, data).map((s) =>
        s
          .replace("  ", " ")
          .split(" ")
          .filter((s) => s !== "")
          .map((s) => +s)
      )
    );
    data = drop(5, data);
  }

  boards = boardValues.map((bv) => new Board(bv, upcomingMoves));
  return { boards, numRounds: upcomingMoves.length };
}

function processPart1() {
  const { boards } = processFile();
  let winningBoardIndex = -1;

  while (winningBoardIndex < 0) {
    boards.forEach((b, idx) => {
      b.processNextMove();
      if (b.checkHasWon()) {
        winningBoardIndex = idx;
      }
    });
  }

  console.log("Answer to part 1:", boards[51].calcPoints());
}

function processPart2() {
  const { boards, numRounds } = processFile();
  let winningBoards: Board[] = [];
  let round = 0;

  while (round < numRounds) {
    boards.forEach((b) => {
      if (!b.checkHasWon()) {
        b.processNextMove();
        if (b.checkHasWon()) {
          winningBoards.push(b);
        }
      }
    });

    round++;
  }

  console.log("Answer to part 2:", last(winningBoards)?.calcPoints());
}

processPart1();
processPart2();
