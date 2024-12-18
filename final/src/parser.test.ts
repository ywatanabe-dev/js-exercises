import {
  skipMany,
  skipMany1,
  many,
  many1,
  char,
  space,
  spaces,
  oneOf,
  noneOf,
  symbol,
  letter,
  digit,
  sepBy,
  endBy,
  parseString,
  parseAtom,
  parseNumber,
  parseExpr,
} from "./parser.ts";

describe("skipMany", () => {
  it("ok", () => {
    expect(skipMany(char("a"))({ source: "", index: 0 })).toStrictEqual({
      value: undefined,
      next: { source: "", index: 0 },
    });
  });

  it("ok", () => {
    expect(skipMany(char("a"))({ source: "aaa", index: 0 })).toStrictEqual({
      value: undefined,
      next: { source: "aaa", index: 3 },
    });
  });

  it("ok", () => {
    expect(skipMany(char("a"))({ source: "ba", index: 0 })).toStrictEqual({
      value: undefined,
      next: { source: "ba", index: 0 },
    });
  });
});

describe("skipMany1", () => {
  it("ok", () => {
    expect(skipMany1(char("a"))({ source: "aaa", index: 0 })).toStrictEqual({
      value: undefined,
      next: { source: "aaa", index: 3 },
    });
  });

  it("ng", () => {
    expect(skipMany1(char("a"))({ source: "", index: 0 })).toStrictEqual(
      new Error("unexpected input")
    );
  });

  it("ng", () => {
    expect(skipMany1(char("a"))({ source: "ba", index: 0 })).toStrictEqual(
      new Error('unexpected value: "b"')
    );
  });
});

describe("many", () => {
  it("ok", () => {
    expect(many(char("a"))({ source: "", index: 0 })).toStrictEqual({
      value: [],
      next: { source: "", index: 0 },
    });
  });

  it("ok", () => {
    expect(many(char("a"))({ source: "aaa", index: 0 })).toStrictEqual({
      value: ["a", "a", "a"],
      next: { source: "aaa", index: 3 },
    });
  });

  it("ok", () => {
    expect(many(char("a"))({ source: "ba", index: 0 })).toStrictEqual({
      value: [],
      next: { source: "ba", index: 0 },
    });
  });
});

describe("many1", () => {
  it("ok", () => {
    expect(many1(char("a"))({ source: "aaa", index: 0 })).toStrictEqual({
      value: ["a", "a", "a"],
      next: { source: "aaa", index: 3 },
    });
  });

  it("ng", () => {
    expect(many1(char("a"))({ source: "", index: 0 })).toStrictEqual(
      new Error("unexpected input")
    );
  });

  it("ng", () => {
    expect(many1(char("a"))({ source: "ba", index: 0 })).toStrictEqual(
      new Error('unexpected value: "b"')
    );
  });
});

describe("char", () => {
  it("ok", () => {
    expect(char("a")({ source: "abc", index: 0 })).toStrictEqual({
      value: "a",
      next: { source: "abc", index: 1 },
    });
  });

  it("ng", () => {
    expect(char("b")({ source: "abc", index: 0 })).toStrictEqual(
      new Error('unexpected value: "a"')
    );
  });
});

describe("space", () => {
  it("ok", () => {
    expect(space()({ source: " ", index: 0 })).toStrictEqual({
      value: " ",
      next: { source: " ", index: 1 },
    });
  });

  it("ok", () => {
    expect(space()({ source: " a", index: 0 })).toStrictEqual({
      value: " ",
      next: { source: " a", index: 1 },
    });
  });

  it("ng", () => {
    expect(space()({ source: "a", index: 0 })).toStrictEqual(
      new Error('unexpected value: "a"')
    );
  });
});

describe("spaces", () => {
  it("ok", () => {
    expect(spaces()({ source: " ", index: 0 })).toStrictEqual({
      value: undefined,
      next: { source: " ", index: 1 },
    });
  });

  it("ok", () => {
    expect(spaces()({ source: "  ", index: 0 })).toStrictEqual({
      value: undefined,
      next: { source: "  ", index: 2 },
    });
  });

  it("ok", () => {
    expect(spaces()({ source: "  a", index: 0 })).toStrictEqual({
      value: undefined,
      next: { source: "  a", index: 2 },
    });
  });

  it("ng", () => {
    expect(spaces()({ source: "", index: 0 })).toStrictEqual(
      new Error("unexpected input")
    );
  });

  it("ng", () => {
    expect(spaces()({ source: "a", index: 0 })).toStrictEqual(
      new Error('unexpected value: "a"')
    );
  });
});

describe("oneOf", () => {
  it("ok", () => {
    expect(oneOf("a", "b", "c")({ source: "abc", index: 0 })).toStrictEqual({
      value: "a",
      next: { source: "abc", index: 1 },
    });
  });

  it("ng", () => {
    expect(oneOf("a", "b", "c")({ source: " abc", index: 0 })).toStrictEqual(
      new Error('unexpected value: " "')
    );
  });
});

describe("noneOf", () => {
  it("ok", () => {
    expect(noneOf("a", "b", "c")({ source: "efg", index: 0 })).toStrictEqual({
      value: "e",
      next: { source: "efg", index: 1 },
    });
  });

  it("ng", () => {
    expect(noneOf("a", "b", "c")({ source: "abc", index: 0 })).toStrictEqual(
      new Error('unexpected value: "a"')
    );
  });
});

describe("symbol", () => {
  it("ok", () => {
    expect(
      many(symbol())({ source: "!#$%&|*+-/:<=>?@^_~", index: 0 })
    ).toStrictEqual({
      value: [
        "!",
        "#",
        "$",
        "%",
        "&",
        "|",
        "*",
        "+",
        "-",
        "/",
        ":",
        "<",
        "=",
        ">",
        "?",
        "@",
        "^",
        "_",
        "~",
      ],
      next: { source: "!#$%&|*+-/:<=>?@^_~", index: 19 },
    });
  });

  it("ng", () => {
    expect(symbol()({ source: "abc", index: 0 })).toStrictEqual(
      new Error('unexpected value: "a"')
    );
  });
});

describe("letter", () => {
  it("ok", () => {
    expect(
      many(letter())({ source: "abcdefghijklmnopqrstuvwxyz", index: 0 })
    ).toStrictEqual({
      value: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
      next: { source: "abcdefghijklmnopqrstuvwxyz", index: 26 },
    });
  });

  it("ok", () => {
    expect(
      many(letter())({ source: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", index: 0 })
    ).toStrictEqual({
      value: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      next: { source: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", index: 26 },
    });
  });

  it("ng", () => {
    expect(letter()({ source: "1234", index: 0 })).toStrictEqual(
      new Error('unexpected value: "1"')
    );
  });
});

describe("digit", () => {
  it("ok", () => {
    expect(many(digit())({ source: "0123456789", index: 0 })).toStrictEqual({
      value: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      next: { source: "0123456789", index: 10 },
    });
  });

  it("ng", () => {
    expect(digit()({ source: "abc", index: 0 })).toStrictEqual(
      new Error('unexpected value: "a"')
    );
  });
});

describe("sepBy", () => {
  it("ok", () => {
    expect(sepBy(letter(), char(","))({ source: "", index: 0 })).toStrictEqual({
      value: [],
      next: { source: "", index: 0 },
    });
  });

  it("ok", () => {
    expect(
      sepBy(letter(), char(","))({ source: "01234", index: 0 })
    ).toStrictEqual({
      value: [],
      next: { source: "01234", index: 0 },
    });
  });

  it("ok", () => {
    expect(
      sepBy(letter(), char(","))({ source: "a,b,c,d,e,f", index: 0 })
    ).toStrictEqual({
      value: ["a", "b", "c", "d", "e", "f"],
      next: { source: "a,b,c,d,e,f", index: 11 },
    });
  });

  it("ok", () => {
    expect(
      sepBy(many1(letter()), spaces())({ source: "abc de fgh ijkl", index: 0 })
    ).toStrictEqual({
      value: [
        ["a", "b", "c"],
        ["d", "e"],
        ["f", "g", "h"],
        ["i", "j", "k", "l"],
      ],
      next: { source: "abc de fgh ijkl", index: 15 },
    });
  });

  it("ok", () => {
    expect(
      sepBy(letter(), char(","))({ source: "a,b,c,d,e,f ghijk", index: 0 })
    ).toStrictEqual({
      value: ["a", "b", "c", "d", "e", "f"],
      next: { source: "a,b,c,d,e,f ghijk", index: 11 },
    });
  });

  it("ok", () => {
    expect(
      sepBy(
        many1(letter()),
        spaces()
      )({ source: "abc de fgh ijkl,mnop", index: 0 })
    ).toStrictEqual({
      value: [
        ["a", "b", "c"],
        ["d", "e"],
        ["f", "g", "h"],
        ["i", "j", "k", "l"],
      ],
      next: { source: "abc de fgh ijkl,mnop", index: 15 },
    });
  });
});

describe("endBy", () => {
  it("ok", () => {
    expect(endBy(letter(), char(","))({ source: "", index: 0 })).toStrictEqual({
      value: [],
      next: { source: "", index: 0 },
    });
  });

  it("ok", () => {
    expect(
      endBy(letter(), char(","))({ source: "01234", index: 0 })
    ).toStrictEqual({
      value: [],
      next: { source: "01234", index: 0 },
    });
  });

  it("ok", () => {
    expect(
      endBy(letter(), char(","))({ source: "a,b,c,d,e,f,", index: 0 })
    ).toStrictEqual({
      value: ["a", "b", "c", "d", "e", "f"],
      next: { source: "a,b,c,d,e,f,", index: 12 },
    });
  });

  it("ok", () => {
    expect(
      endBy(many1(letter()), spaces())({ source: "abc de fgh ijkl ", index: 0 })
    ).toStrictEqual({
      value: [
        ["a", "b", "c"],
        ["d", "e"],
        ["f", "g", "h"],
        ["i", "j", "k", "l"],
      ],
      next: { source: "abc de fgh ijkl ", index: 16 },
    });
  });

  it("ok", () => {
    expect(
      endBy(letter(), char(","))({ source: "a,b,c,d,e,f ghijk", index: 0 })
    ).toStrictEqual({
      value: ["a", "b", "c", "d", "e"],
      next: { source: "a,b,c,d,e,f ghijk", index: 10 },
    });
  });

  it("ok", () => {
    expect(
      endBy(
        many1(letter()),
        spaces()
      )({ source: "abc de fgh ijkl,mnop", index: 0 })
    ).toStrictEqual({
      value: [
        ["a", "b", "c"],
        ["d", "e"],
        ["f", "g", "h"],
      ],
      next: { source: "abc de fgh ijkl,mnop", index: 11 },
    });
  });
});

describe("parseString", () => {
  it("ok", () => {
    expect(parseString()({ source: '"abc"', index: 0 })).toStrictEqual({
      value: "abc",
      next: { source: '"abc"', index: 5 },
    });
  });

  it("ok", () => {
    expect(parseString()({ source: '"abc"def', index: 0 })).toStrictEqual({
      value: "abc",
      next: { source: '"abc"def', index: 5 },
    });
  });

  it("ok", () => {
    expect(parseString()({ source: '"abc""def"', index: 0 })).toStrictEqual({
      value: "abc",
      next: { source: '"abc""def"', index: 5 },
    });
  });

  it("ok", () => {
    expect(
      many1(parseString())({ source: '"abc""def"', index: 0 })
    ).toStrictEqual({
      value: ["abc", "def"],
      next: { source: '"abc""def"', index: 10 },
    });
  });

  it("ng", () => {
    expect(parseString()({ source: "", index: 0 })).toStrictEqual(
      new Error("unexpected input")
    );
  });

  it("ng", () => {
    expect(parseString()({ source: "abc", index: 0 })).toStrictEqual(
      new Error('unexpected value: "a"')
    );
  });
});

describe("parseAtom", () => {
  it("ok", () => {
    expect(parseAtom()({ source: "a1234", index: 0 })).toStrictEqual({
      value: { name: "a1234" },
      next: { source: "a1234", index: 5 },
    });
  });

  it("ok", () => {
    expect(parseAtom()({ source: "!1234", index: 0 })).toStrictEqual({
      value: { name: "!1234" },
      next: { source: "!1234", index: 5 },
    });
  });

  it("ok", () => {
    expect(parseAtom()({ source: "#t", index: 0 })).toStrictEqual({
      value: true,
      next: { source: "#t", index: 2 },
    });
  });

  it("ok", () => {
    expect(parseAtom()({ source: "#true", index: 0 })).toStrictEqual({
      value: { name: "#true" },
      next: { source: "#true", index: 5 },
    });
  });

  it("ok", () => {
    expect(parseAtom()({ source: "#f", index: 0 })).toStrictEqual({
      value: false,
      next: { source: "#f", index: 2 },
    });
  });

  it("ok", () => {
    expect(parseAtom()({ source: "#false", index: 0 })).toStrictEqual({
      value: { name: "#false" },
      next: { source: "#false", index: 6 },
    });
  });

  it("ok", () => {
    expect(parseAtom()({ source: "a1234 b1234", index: 0 })).toStrictEqual({
      value: { name: "a1234" },
      next: { source: "a1234 b1234", index: 5 },
    });
  });

  it("ok", () => {
    expect(
      sepBy(parseAtom(), spaces())({ source: "a1234 b1234", index: 0 })
    ).toStrictEqual({
      value: [{ name: "a1234" }, { name: "b1234" }],
      next: { source: "a1234 b1234", index: 11 },
    });
  });

  it("ng", () => {
    expect(parseAtom()({ source: "", index: 0 })).toStrictEqual(
      new Error("unexpected input")
    );
  });

  it("ng", () => {
    expect(parseAtom()({ source: '"abc"', index: 0 })).toStrictEqual(
      new Error('unexpected value: """')
    );
  });

  it("ng", () => {
    expect(parseAtom()({ source: "1234", index: 0 })).toStrictEqual(
      new Error('unexpected value: "1"')
    );
  });
});

describe("parseNumber", () => {
  it("ok", () => {
    expect(parseNumber()({ source: "1234", index: 0 })).toStrictEqual({
      value: 1234,
      next: { source: "1234", index: 4 },
    });
  });

  it("ok", () => {
    expect(parseNumber()({ source: "12abc", index: 0 })).toStrictEqual({
      value: 12,
      next: { source: "12abc", index: 2 },
    });
  });

  it("ok", () => {
    expect(parseNumber()({ source: "12 34", index: 0 })).toStrictEqual({
      value: 12,
      next: { source: "12 34", index: 2 },
    });
  });

  it("ok", () => {
    expect(
      sepBy(parseNumber(), spaces())({ source: "12 34", index: 0 })
    ).toStrictEqual({
      value: [12, 34],
      next: { source: "12 34", index: 5 },
    });
  });

  it("ng", () => {
    expect(parseString()({ source: "", index: 0 })).toStrictEqual(
      new Error("unexpected input")
    );
  });

  it("ng", () => {
    expect(parseString()({ source: "abc", index: 0 })).toStrictEqual(
      new Error('unexpected value: "a"')
    );
  });
});

describe("parseExpr", () => {
  it("ok", () => {
    expect(parseExpr()({ source: "(f 0 1)", index: 0 })).toStrictEqual({
      value: [{ name: "f" }, 0, 1],
      next: { source: "(f 0 1)", index: 7 },
    });
  });

  it("ok", () => {
    expect(parseExpr()({ source: "(f (g 0 1))", index: 0 })).toStrictEqual({
      value: [{ name: "f" }, [{ name: "g" }, 0, 1]],
      next: { source: "(f (g 0 1))", index: 11 },
    });
  });

  it("ok", () => {
    expect(parseExpr()({ source: "(f (g 0 1) 2)", index: 0 })).toStrictEqual({
      value: [{ name: "f" }, [{ name: "g" }, 0, 1], 2],
      next: { source: "(f (g 0 1) 2)", index: 13 },
    });
  });

  it("ok", () => {
    expect(parseExpr()({ source: "(f '(0 1 2))", index: 0 })).toStrictEqual({
      value: [{ name: "f" }, [{ name: "quote" }, [0, 1, 2]]],
      next: { source: "(f '(0 1 2))", index: 12 },
    });
  });

  it("ok", () => {
    expect(parseExpr()({ source: "(f '(0 . 1))", index: 0 })).toStrictEqual({
      value: [{ name: "f" }, [{ name: "quote" }, { head: [0], tail: 1 }]],
      next: { source: "(f '(0 . 1))", index: 12 },
    });
  });

  it("ok", () => {
    expect(parseExpr()({ source: "(f '(0 1 2 . 1))", index: 0 })).toStrictEqual(
      {
        value: [
          { name: "f" },
          [{ name: "quote" }, { head: [0, 1, 2], tail: 1 }],
        ],
        next: { source: "(f '(0 1 2 . 1))", index: 16 },
      }
    );
  });

  it("ok", () => {
    expect(
      parseExpr()({ source: "(f '((0 1 2) . 1))", index: 0 })
    ).toStrictEqual({
      value: [
        { name: "f" },
        [{ name: "quote" }, { head: [[0, 1, 2]], tail: 1 }],
      ],
      next: { source: "(f '((0 1 2) . 1))", index: 18 },
    });
  });

  it("ok", () => {
    expect(
      parseExpr()({ source: '(f #t \'((0 #f 2) . 1) "abc")', index: 0 })
    ).toStrictEqual({
      value: [
        { name: "f" },
        true,
        [{ name: "quote" }, { head: [[0, false, 2]], tail: 1 }],
        "abc",
      ],
      next: { source: '(f #t \'((0 #f 2) . 1) "abc")', index: 28 },
    });
  });

  it("ok", () => {
    expect(parseExpr()({ source: "(f g 1)", index: 0 })).toStrictEqual({
      value: [{ name: "f" }, { name: "g" }, 1],
      next: { source: "(f g 1)", index: 7 },
    });
  });

  it("ok", () => {
    expect(parseExpr()({ source: "(a test)", index: 0 })).toStrictEqual({
      value: [{ name: "a" }, { name: "test" }],
      next: { source: "(a test)", index: 8 },
    });
  });

  it("ok", () => {
    expect(
      parseExpr()({ source: "(a (nested) test)", index: 0 })
    ).toStrictEqual({
      value: [{ name: "a" }, [{ name: "nested" }], { name: "test" }],
      next: { source: "(a (nested) test)", index: 17 },
    });
  });

  it("ok", () => {
    expect(
      parseExpr()({ source: "(a (dotted . list) test)", index: 0 })
    ).toStrictEqual({
      value: [
        { name: "a" },
        { head: [{ name: "dotted" }], tail: { name: "list" } },
        { name: "test" },
      ],
      next: { source: "(a (dotted . list) test)", index: 24 },
    });
  });

  it("ok", () => {
    expect(
      parseExpr()({ source: "(a '(quoted (dotted . list)) test)", index: 0 })
    ).toStrictEqual({
      value: [
        { name: "a" },
        [
          { name: "quote" },
          [
            { name: "quoted" },
            { head: [{ name: "dotted" }], tail: { name: "list" } },
          ],
        ],
        { name: "test" },
      ],
      next: { source: "(a '(quoted (dotted . list)) test)", index: 34 },
    });
  });

  it("ng", () => {
    expect(parseExpr()({ source: "(f 0 1(", index: 0 })).toStrictEqual(
      new Error('unexpected value: "("')
    );
  });

  it("ng", () => {
    expect(
      parseExpr()({ source: "(a '(imbalanced parens)", index: 0 })
    ).toStrictEqual(new Error('unexpected value: "("'));
  });
});
