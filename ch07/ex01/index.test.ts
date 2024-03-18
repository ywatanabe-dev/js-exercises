import { addMatrix, mulMatrix } from "./index.ts";

describe("addMatrix", () => {
  it("[[]] + [[]] = [[]]", () => {
    expect(addMatrix([[]], [[]])).toStrictEqual([[]]);
  });

  it("[[1, 2], [3, 4]] + [[1, 2], [3, 4]] = [[2, 4], [6, 8]]", () => {
    expect(
      addMatrix(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [1, 2],
          [3, 4],
        ]
      )
    ).toStrictEqual([
      [2, 4],
      [6, 8],
    ]);
  });

  it("[] + [] => []", () => {
    expect(addMatrix([], [])).toStrictEqual([]);
  });

  it("[[1, 2], [3, 4]] + [[]] => TypeError", () => {
    expect(() => {
      addMatrix(
        [
          [1, 2],
          [3, 4],
        ],
        [[]]
      );
    }).toThrow(TypeError("matrices do not have equal number of rows"));
  });

  it("[[1, 2], [3, 4]] + [[1], [2]] => TypeError", () => {
    expect(() => {
      addMatrix(
        [
          [1, 2],
          [3, 4],
        ],
        [[], []]
      );
    }).toThrow(TypeError("matrices do not have equal number of columns"));
  });
});

describe("mulMatrix", () => {
  it("[[]] * [[]] => TypeError", () => {
    expect(() => {
      mulMatrix([[]], [[]]);
    }).toThrow(
      TypeError(
        "number of columns in 'a' and number of rows in 'b are different"
      )
    );
  });

  it("[[1, 2], [3, 4]] + [[1, 2], [3, 4]] = [[2, 4], [6, 8]]", () => {
    expect(
      mulMatrix(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [1, 2],
          [3, 4],
        ]
      )
    ).toStrictEqual([
      [7, 10],
      [15, 22],
    ]);
  });

  it("[[1, 2, 3], [2, 3, 4]] * [[1, 2], [2, 3], [3, 4]] = [[ 14, 20 ], [ 20, 29 ]]", () => {
    expect(
      mulMatrix(
        [
          [1, 2, 3],
          [2, 3, 4],
        ],
        [
          [1, 2],
          [2, 3],
          [3, 4],
        ]
      )
    ).toStrictEqual([
      [14, 20],
      [20, 29],
    ]);
  });

  it("[] * [] => []", () => {
    expect(mulMatrix([], [])).toStrictEqual([]);
  });

  it("[[1, 2], [3, 4]] + [[1, 2], [2, 3], [3, 4]] => TypeError", () => {
    expect(() => {
      mulMatrix(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [1, 2],
          [2, 3],
          [3, 4],
        ]
      );
    }).toThrow(
      TypeError(
        "number of columns in 'a' and number of rows in 'b are different"
      )
    );
  });
});
