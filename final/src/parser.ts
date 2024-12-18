import { LispError } from "./error.ts";
import { Env } from "./variable.ts";

type Input = {
  source: string;
  index: number;
};

export type Parser<T> = (input: Input) =>
  | {
      value: T;
      next: Input;
    }
  | Error;

export type Atom = {
  name: string;
};

export type DottedList = {
  head: LispVal[];
  tail: LispVal;
};

export type PrimitiveFunc = {
  func: (val: LispVal[]) => LispVal | LispError;
};

export type Func = {
  params: string[];
  vararg: string | undefined;
  body: LispVal[];
  closure: Env;
};

export type LispVal =
  | Atom
  | number
  | string
  | boolean
  | LispVal[]
  | DottedList
  | PrimitiveFunc
  | Func;

export function isAtom(value: LispVal): value is Atom {
  return typeof value === "object" && value !== null && "name" in value;
}

export function isDottedList(value: LispVal): value is DottedList {
  return (
    typeof value === "object" &&
    value !== null &&
    "head" in value &&
    "tail" in value
  );
}

export function isPrimitiveFunc(value: LispVal): value is PrimitiveFunc {
  return typeof value === "object" && value !== null && "func" in value;
}

export function isFunc(value: LispVal): value is Func {
  return (
    typeof value === "object" &&
    value !== null &&
    "params" in value &&
    "body" in value &&
    "closure" in value
  );
}

export function skipMany<T>(parser: Parser<T>): Parser<undefined> {
  return ({ source, index }) => {
    const result = parser({ source, index });
    if (result instanceof Error) {
      return {
        value: undefined,
        next: { source, index },
      };
    }
    let output = { next: result.next };
    for (;;) {
      const result = parser(output.next);
      if (result instanceof Error) {
        break;
      } else {
        output = result;
      }
    }
    return {
      value: undefined,
      next: output.next,
    };
  };
}

export function skipMany1(parser: Parser<string>): Parser<undefined> {
  return ({ source, index }) => {
    const result = parser({ source, index });
    if (result instanceof Error) {
      return result;
    }
    return skipMany(parser)(result.next);
  };
}

export function many<T>(parser: Parser<T>): Parser<T[]> {
  return ({ source, index }) => {
    let output = { next: { source, index } };
    const value: T[] = [];
    for (;;) {
      const result = parser(output.next);
      if (result instanceof Error) {
        break;
      } else {
        value.push(result.value);
        output = result;
      }
    }
    return {
      value,
      next: output.next,
    };
  };
}

export function many1<T>(parser: Parser<T>): Parser<T[]> {
  return ({ source, index }) => {
    const head = parser({ source, index });
    if (head instanceof Error) {
      return head;
    }
    const tail = many(parser)(head.next);
    if (tail instanceof Error) {
      return tail;
    }
    return { value: [head.value].concat(tail.value), next: tail.next };
  };
}

export function char(char: string): Parser<string> {
  return ({ source, index }) => {
    if (source.indexOf(char, index) === index) {
      return {
        value: char,
        next: { source, index: index + char.length },
      };
    }
    return new Error(
      source.length === 0
        ? "unexpected input"
        : `unexpected value: \"${source[index]}\"`
    );
  };
}

export function space(): Parser<string> {
  return oneOf(" ", "\n");
}

export function spaces(): Parser<undefined> {
  return skipMany1(space());
}

export function oneOf(...values: string[]): Parser<string> {
  return ({ source, index }) => {
    for (const value of values) {
      if (source.indexOf(value, index) === index) {
        return {
          value,
          next: { source, index: index + value.length },
        };
      }
    }
    return new Error(
      source.length === 0
        ? "unexpected input"
        : `unexpected value: \"${source[index]}\"`
    );
  };
}

export function noneOf(...values: string[]): Parser<string> {
  return ({ source, index }) => {
    const result = oneOf(...values)({ source, index });
    if (result instanceof Error) {
      return {
        value: source[index],
        next: { source, index: index + 1 },
      };
    } else {
      return new Error(
        source.length === 0
          ? "unexpected input"
          : `unexpected value: \"${source[index]}\"`
      );
    }
  };
}

export function symbol(): Parser<string> {
  return oneOf(
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
    "~"
  );
}

export function letter(): Parser<string> {
  const lowerCase = [];
  for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
    lowerCase.push(String.fromCodePoint(i));
  }
  const upperCase = [];
  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    upperCase.push(String.fromCodePoint(i));
  }
  return oneOf(...lowerCase, ...upperCase);
}

export function digit(): Parser<string> {
  return oneOf("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
}

function alternate<T>(...parsers: Parser<T>[]): Parser<T> {
  return (input: Input) => {
    for (const p of parsers) {
      const result = p(input);
      if (!(result instanceof Error)) {
        return result;
      }
    }
    return new Error(
      input.source.length === 0
        ? "unexpected input"
        : `unexpected value: \"${input.source[input.index]}\"`
    );
  };
}

export function sepBy<T, S>(p: Parser<T>, sep: Parser<S>): Parser<T[]> {
  return (input: Input) => {
    const values: T[] = [];
    const head = p(input);
    if (head instanceof Error) {
      return { value: [], next: input };
    }
    values.push(head.value);
    const tailp = ({ source, index }: Input) => {
      const first = sep({ source, index });
      if (first instanceof Error) {
        return first;
      }
      const second = p(first.next);
      if (second instanceof Error) {
        return second;
      }
      values.push(second.value);
      return { value: undefined, next: second.next };
    };
    const tail = many(tailp)(head.next);
    if (tail instanceof Error) {
      return tail;
    }
    return { value: values, next: tail.next };
  };
}

export function endBy<T, S>(p: Parser<T>, sep: Parser<S>): Parser<T[]> {
  return (input: Input) => {
    const values: T[] = [];
    const tailp = ({ source, index }: Input) => {
      const first = p({ source, index });
      if (first instanceof Error) {
        return first;
      }
      const second = sep(first.next);
      if (second instanceof Error) {
        return second;
      }
      values.push(first.value);
      return { value: undefined, next: second.next };
    };
    const result = many(tailp)(input);
    if (result instanceof Error) {
      return result;
    }
    return { value: values, next: result.next };
  };
}

export function parseString(): Parser<string> {
  return (input: Input) => {
    const startQuote = char('"')(input);
    if (startQuote instanceof Error) {
      return startQuote;
    }
    const str = many(noneOf('"'))(startQuote.next);
    if (str instanceof Error) {
      return str;
    }
    const endQuote = char('"')(str.next);
    if (endQuote instanceof Error) {
      return endQuote;
    }
    return { value: str.value.join(""), next: endQuote.next };
  };
}

export function parseAtom(): Parser<Atom | boolean> {
  return (input: Input) => {
    const first = alternate(letter(), symbol())(input);
    if (first instanceof Error) {
      return first;
    }
    const rest = many(alternate(letter(), digit(), symbol()))(first.next);
    if (rest instanceof Error) {
      return rest;
    }
    const atom = first.value + rest.value.join("");
    if (atom === "#t") {
      return { value: true, next: rest.next };
    } else if (atom === "#f") {
      return { value: false, next: rest.next };
    } else {
      return { value: { name: atom }, next: rest.next };
    }
  };
}

export function parseNumber(): Parser<number> {
  return (input: Input) => {
    const result = many1(digit())(input);
    if (result instanceof Error) {
      return result;
    }
    const value = result.value.join("");
    return { value: Number(value), next: result.next };
  };
}

export function parseExpr(): Parser<LispVal> {
  return (input: Input) => {
    const listOrDottedList = () => {
      return (input: Input) => {
        const startParen = char("(")(input);
        if (startParen instanceof Error) {
          return startParen;
        }
        let result = alternate<LispVal>(
          parseDottedList(),
          parseList()
        )(startParen.next);
        if (result instanceof Error) {
          return result;
        }
        const endParen = char(")")(result.next);
        if (endParen instanceof Error) {
          return endParen;
        }
        return { value: result.value, next: endParen.next };
      };
    };
    return alternate<LispVal>(
      parseAtom(),
      parseString(),
      parseNumber(),
      parseQuoted(),
      listOrDottedList()
    )(input);
  };
}

export function parseList(): Parser<LispVal> {
  return (input: Input) => {
    const result = sepBy(parseExpr(), spaces())(input);
    if (result instanceof Error) {
      return result;
    }
    return { value: result.value, next: result.next };
  };
}

export function parseDottedList(): Parser<LispVal> {
  return (input: Input) => {
    const head = endBy(parseExpr(), spaces())(input);
    if (head instanceof Error) {
      return head;
    }
    const dot = char(".")(head.next);
    if (dot instanceof Error) {
      return dot;
    }
    const sp = spaces()(dot.next);
    if (sp instanceof Error) {
      return sp;
    }
    const tail = parseExpr()(sp.next);
    if (tail instanceof Error) {
      return tail;
    }
    return { value: { head: head.value, tail: tail.value }, next: tail.next };
  };
}

export function parseQuoted(): Parser<LispVal> {
  return (input: Input) => {
    const quote = char("'")(input);
    if (quote instanceof Error) {
      return quote;
    }
    const result = parseExpr()(quote.next);
    if (result instanceof Error) {
      return result;
    }
    return { value: [{ name: "quote" }, result.value], next: result.next };
  };
}
