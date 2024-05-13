import {
  alt,
  charFrom,
  charNotFrom,
  dot,
  match,
  quote,
  repeat,
  seq,
} from "./index.js";

// NOTE: 配列の各要素の先頭 (正規表現) は説明用の値でありテストには用いない
const oks = [
  // seq
  [new RegExp(""), "", seq()],
  [/HELLO/, "HELLO", seq(quote("HELLO"))],
  [/(HELLO)(WORLD)/, "HELLOWORLD", seq(quote("HELLO"), quote("WORLD"))],
  [
    /(HELLO)(WORLD)(!)/,
    "HELLOWORLD!",
    seq(quote("HELLO"), quote("WORLD"), quote("!")),
  ],
  // alt
  [/X/, "X", alt(quote("X"))],
  [/X|Y/, "X", alt(quote("X"), quote("Y"))],
  [/X|Y/, "Y", alt(quote("X"), quote("Y"))],
  [/X|Y|Z/, "Z", alt(quote("X"), quote("Y"), quote("Z"))],
  // dot
  [/./, "A", dot()],
  [/./, "あ", dot()],
  // seq + alt + dot
  [
    /.(A|B)../,
    "XAYZ",
    seq(dot(), alt(quote("A"), quote("B")), seq(dot(), dot())),
  ],
  [/ABC|../, "XY", alt(quote("ABC"), seq(dot(), dot()))],
  // charFrom
  [/[ABC][XYZ]/, "BY", seq(charFrom("ABC"), charFrom("XYZ"))],
  // charNotFrom
  [/[^ABC][^XYZ]/, "DW", seq(charNotFrom("ABC"), charNotFrom("XYZ"))],
  // seq + alt + charFrom + charNotFrom + dot
  [
    /[^ABC].([XYZ]|[xyz])/,
    "X!X",
    seq(charNotFrom("ABC"), dot(), alt(charFrom("XYZ"), quote("!!!"))),
  ],
  // repeat
  [/[AB]{2}/, "BA", repeat(charFrom("AB"), 2, 2)],
  [/[AB]{3,}/, "AAB", repeat(charFrom("AB"), 3)],
  [/[AB]{3,}/, "AABA", repeat(charFrom("AB"), 3)],
  [/[AB]{3,5}/, "ABA", repeat(charFrom("AB"), 3, 5)],
  [/[AB]{3,5}/, "ABAB", repeat(charFrom("AB"), 3, 5)],
  [/[AB]{3,5}/, "ABABA", repeat(charFrom("AB"), 3, 5)],
  // repeat + seq
  [/(aa)+a/, "aaa", seq(repeat(quote("aa"), 1), quote("a"))],
  [/(aa)+a/, "aaaaa", seq(repeat(quote("aa"), 1), quote("a"))],
  [/(aa)+a/, "aaaaaaaaaaaaa", seq(repeat(quote("aa"), 1), quote("a"))],
  [
    /(AA)+A(AA)+/,
    "AAAAA",
    seq(repeat(quote("AA"), 1), quote("A"), repeat(quote("AA"), 1)),
  ],
  [
    /(AA)+A(AA)+/,
    "AAAAAAA",
    seq(repeat(quote("AA"), 1), quote("A"), repeat(quote("AA"), 1)),
  ],
  // complex
  [
    /[Jj]ava([Ss]cript)? is fun/,
    "JavaScript is fun",
    seq(
      charFrom("Jj"),
      quote("ava"),
      repeat(seq(charFrom("Ss"), quote("cript")), 0, 1),
      quote(" is fun")
    ),
  ],
  [
    /[Jj]ava([Ss]cript)? is fun/,
    "java is fun",
    seq(
      charFrom("Jj"),
      quote("ava"),
      repeat(seq(charFrom("Ss"), quote("cript")), 0, 1),
      quote(" is fun")
    ),
  ],
];

// NOTE: 配列の各要素の先頭 (正規表現) は説明用の値でありテストには用いない
const ngs = [
  // seq
  [new RegExp(""), "!", seq()],
  [/HELLO/, "HELLO!", seq(quote("HELLO"))],
  [/HELLO/, "HELL0", seq(quote("HELLO"))],
  [/HELLO/, "HELL", seq(quote("HELLO"))],
  [/HELLO/, "ELLO", seq(quote("HELLO"))],
  [/(HELLO)(WORLD)/, "HELLO", seq(quote("HELLO"), quote("WORLD"))],
  [
    /(HELLO)(WORLD)(!)/,
    "HELLOWORLD",
    seq(quote("HELLO"), quote("WORLD"), quote("!")),
  ],
  // alt
  [/X/, "Z", alt(quote("X"))],
  [/X|Y/, "Z", alt(quote("X"), quote("Y"))],
  [/X|Y|Z/, "W", alt(quote("X"), quote("Y"), quote("Z"))],
  // dot
  [/./, "", dot()],
  // seq + alt + dot
  [
    /.(A|B)../,
    "XCYZ",
    seq(dot(), alt(quote("A"), quote("B")), seq(dot(), dot())),
  ],
  [/ABC|../, "X", alt(quote("ABC"), seq(dot(), dot()))],
  // charFrom
  [/[ABC][XYZ]/, "XX", seq(charFrom("ABC"), charFrom("XYZ"))],
  // charNotFrom
  [/[^ABC][^XYZ]/, "AW", seq(charNotFrom("ABC"), charNotFrom("XYZ"))],
  // seq + alt + charFrom + charNotFrom + dot
  [
    /[^ABC].([XYZ]|[xyz])/,
    "X!w",
    seq(charNotFrom("ABC"), dot(), alt(charFrom("XYZ"), quote("!!!"))),
  ],
  // repeat
  [/[AB]{2}/, "B", repeat(charFrom("AB"), 2, 2)],
  [/[AB]{2}/, "AAA", repeat(charFrom("AB"), 2, 2)],
  [/[AB]{3,}/, "AA", repeat(charFrom("AB"), 3)],
  [/[AB]{3,5}/, "AB", repeat(charFrom("AB"), 3, 5)],
  [/[AB]{3,5}/, "ABABAB", repeat(charFrom("AB"), 3, 5)],
  // repeat + seq
  [/(aa)+a/, "aa", seq(repeat(quote("aa"), 1), quote("a"))],
  [/(aa)+a/, "aaaa", seq(repeat(quote("aa"), 1), quote("a"))],
  [/(aa)+a/, "aaaaaaaaaaaa", seq(repeat(quote("aa"), 1), quote("a"))],
  [
    /(AA)+A(AA)+/,
    "AAAAAA",
    seq(repeat(quote("AA"), 1), quote("A"), repeat(quote("AA"), 1)),
  ],
  [
    /(AA)+A(AA)+/,
    "AAAAAAAA",
    seq(repeat(quote("AA"), 1), quote("A"), repeat(quote("AA"), 1)),
  ],
  // complex
  [
    /[Jj]ava([Ss]cript)? is fun/,
    "JAVA is fun",
    seq(
      charFrom("Jj"),
      quote("ava"),
      repeat(seq(charFrom("Ss"), quote("cript")), 0, 1),
      quote(" is fun")
    ),
  ],
  [
    /[Jj]ava([Ss]cript)? is fun/,
    "javascripT is fun",
    seq(
      charFrom("Jj"),
      quote("ava"),
      repeat(seq(charFrom("Ss"), quote("cript")), 0, 1),
      quote(" is fun")
    ),
  ],
];

test.each(oks)("ok: %p accepts %p", (_name, input, pattern) => {
  expect(match(pattern, input)).toStrictEqual(true);
});

test.each(ngs)("ok: %p doesn't accepts %p", (_name, input, pattern) => {
  expect(match(pattern, input)).toStrictEqual(false);
});
