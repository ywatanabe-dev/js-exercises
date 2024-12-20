import { isLispError, LispError } from "./error.ts";
import {
  LispVal,
  Atom,
  isAtom,
  isDottedList,
  parseExpr,
  isPrimitiveFunc,
  isFunc,
  Parser,
  endBy,
  spaces,
} from "./parser.ts";
import { bindVars, defineVar, Env, getVar, setVar } from "./variable.ts";
import fs from "fs";

export function bind(
  val: LispVal | LispError,
  ...func: ((env: Env, val: LispVal) => LispVal | LispError)[]
): LispVal | LispError {
  if (isLispError(val)) {
    return val;
  }
  let result: LispVal | LispError = val;
  const env = primitiveBindings;
  for (const f of func) {
    result = f(env, result);
    if (isLispError(result)) {
      return result;
    }
  }
  return result;
}

export function unwordsList(value: LispVal[]): string {
  return value.map(showVal).join(" ");
}

export function showVal(value: LispVal): string {
  if (typeof value === "string") {
    return '"' + value + '"';
  } else if (isAtom(value)) {
    return value.name;
  } else if (typeof value === "number") {
    return value.toString();
  } else if (typeof value === "boolean") {
    return value ? "#t" : "#f";
  } else if (value instanceof Array) {
    return "(" + unwordsList(value) + ")";
  } else if (isDottedList(value)) {
    return "(" + unwordsList(value.head) + " . " + showVal(value.tail) + ")";
  } else if (isPrimitiveFunc(value)) {
    return "<primitive>";
  } else if (isFunc(value)) {
    return (
      "(lambda (" +
      unwordsList(value.params) +
      (value.vararg ? "." + value.vararg : "") +
      ") ...)"
    );
  }
  throw new Error();
}

export function readExpr(input: string): LispVal | LispError {
  return readOrThrow(parseExpr(), input);
}

export function readExprList(input: string): LispVal[] | LispError {
  return readOrThrow(endBy(parseExpr(), spaces()), input);
}

function readOrThrow<T>(parser: Parser<T>, input: string): T | LispError {
  const result = parser({ source: input, index: 0 });
  if (result instanceof Error) {
    return {
      type: "ParserError",
      error: result,
    };
  }
  return result.value;
}

const plus = (left: number, right: number) => left + right;
const minus = (left: number, right: number) => left - right;
const multi = (left: number, right: number) => left * right;
const div = (left: number, right: number) => Math.floor(left / right);
const mod = (left: number, right: number) => left % right;
function numericBinop(
  op: (left: number, right: number) => number
): (params: LispVal[]) => LispVal | LispError {
  return (params: LispVal[]) => {
    if (params.length === 1) {
      return {
        type: "NumArgs",
        expected: 2,
        found: params,
      };
    }
    const values = params.map(unpackNum);
    const args = [];

    for (const val of values) {
      if (typeof val !== "number") {
        return val;
      }
      args.push(val);
    }
    return args.reduce(op);
  };
}

const eq = (left: number, right: number) => left === right;
const less = (left: number, right: number) => left < right;
const greater = (left: number, right: number) => left > right;
const neq = (left: number, right: number) => left !== right;
const geq = (left: number, right: number) => left >= right;
const leq = (left: number, right: number) => left <= right;
const and = (left: boolean, right: boolean) => left && right;
const or = (left: boolean, right: boolean) => left || right;
const strEq = (left: string, right: string) => left === right;
const strLess = (left: string, right: string) => left < right;
const strGreater = (left: string, right: string) => left > right;
const strGeq = (left: string, right: string) => left >= right;
const strLeq = (left: string, right: string) => left <= right;
function boolBinop<T>(
  unpack: (value: LispVal) => T | LispError,
  op: (left: T, right: T) => boolean
): (params: LispVal[]) => LispVal | LispError {
  return (params: LispVal[]) => {
    if (params.length !== 2) {
      return {
        type: "NumArgs",
        expected: 2,
        found: params,
      };
    }
    const values = params.map(unpack);
    const args: T[] = [];

    for (const val of values) {
      if (isLispError(val)) {
        return val;
      }
      args.push(val);
    }
    return op(args[0], args[1]);
  };
}

function unpackNum(value: LispVal): number | LispError {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string" && !Number.isNaN(Number(value))) {
    return Number(value);
  } else if (value instanceof Array && value.length === 1) {
    return unpackNum(value[0]);
  } else {
    return {
      type: "TypeMismatch",
      expected: "number",
      found: value,
    };
  }
}

function unpackBool(value: LispVal): boolean | LispError {
  if (typeof value === "boolean") {
    return value;
  } else {
    return {
      type: "TypeMismatch",
      expected: "boolean",
      found: value,
    };
  }
}

function unpackStr(value: LispVal): string | LispError {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return String(value);
  } else if (typeof value === "boolean") {
    return value ? "#t" : "#f";
  } else {
    return {
      type: "TypeMismatch",
      expected: "string",
      found: value,
    };
  }
}

const primitives: {
  name: string;
  func: (args: LispVal[]) => LispVal | LispError;
}[] = [
  { name: "+", func: numericBinop(plus) },
  { name: "-", func: numericBinop(minus) },
  { name: "*", func: numericBinop(multi) },
  { name: "/", func: numericBinop(div) },
  { name: "mod", func: numericBinop(mod) },
  // { name: "quotient", func: numericBinop(quot) },
  // { name: "remainder", func: numericBinop(rem) },
  { name: "=", func: boolBinop(unpackNum, eq) },
  { name: "<", func: boolBinop(unpackNum, less) },
  { name: ">", func: boolBinop(unpackNum, greater) },
  { name: "/=", func: boolBinop(unpackNum, neq) },
  { name: ">=", func: boolBinop(unpackNum, geq) },
  { name: "<=", func: boolBinop(unpackNum, leq) },
  { name: "&&", func: boolBinop(unpackBool, and) },
  { name: "||", func: boolBinop(unpackBool, or) },
  { name: "string=?", func: boolBinop(unpackStr, strEq) },
  { name: "string<?", func: boolBinop(unpackStr, strLess) },
  { name: "string>?", func: boolBinop(unpackStr, strGreater) },
  { name: "string<=?", func: boolBinop(unpackStr, strLeq) },
  { name: "string>=?", func: boolBinop(unpackStr, strGeq) },
  { name: "car", func: car },
  { name: "cdr", func: cdr },
  { name: "cons", func: cons },
  { name: "eq?", func: eqv },
  { name: "eqv?", func: eqv },
  { name: "equal?", func: equal },
  { name: "print", func: print },
  { name: "get-time", func: getTime },
  { name: "list-ref", func: listRef },
  { name: "string->list", func: stringToList },
  { name: "null?", func: nullCheck },
  { name: "string-append", func: stringAppend },
  { name: "char->integer", func: charToInteger },
  { name: "number->string", func: numberToString },
  { name: "append", func: append },
  { name: "list", func: list },
];

export const primitiveBindings = bindVars(
  {},
  primitives.map(({ name, func }) => {
    return { name, value: { func } };
  })
);

function car(args: LispVal[]): LispVal | LispError {
  if (args.length === 1 && args[0] instanceof Array) {
    return args[0][0];
  } else if (args.length === 1 && isDottedList(args[0])) {
    return args[0].head[0];
  } else if (args.length === 1) {
    return {
      type: "TypeMismatch",
      expected: "pair",
      found: args[0],
    };
  } else {
    return {
      type: "NumArgs",
      expected: 1,
      found: args,
    };
  }
}

function cdr(args: LispVal[]): LispVal | LispError {
  if (args.length === 1 && args[0] instanceof Array) {
    return args[0].slice(1);
  } else if (args.length === 1 && isDottedList(args[0])) {
    return args[0].head.length === 1
      ? args[0].tail
      : { head: args[0].head.slice(1), tail: args[0].tail };
  } else if (args.length === 1) {
    return {
      type: "TypeMismatch",
      expected: "pair",
      found: args[0],
    };
  } else {
    return {
      type: "NumArgs",
      expected: 1,
      found: args,
    };
  }
}

function cons(args: LispVal[]): LispVal | LispError {
  if (args.length === 2 && args[1] instanceof Array) {
    return [args[0]].concat(args[1]);
  } else if (args.length === 2 && isDottedList(args[1])) {
    return {
      head: [args[0]].concat(args[1].head),
      tail: args[1].tail,
    };
  } else if (args.length === 2) {
    return {
      head: [args[0]],
      tail: args[1],
    };
  } else {
    return {
      type: "NumArgs",
      expected: 2,
      found: args,
    };
  }
}

// これは本来のeq? eqv?の挙動と異なる
function eqv(args: LispVal[]): boolean | LispError {
  if (
    args.length === 2 &&
    typeof args[0] === "boolean" &&
    typeof args[1] === "boolean"
  ) {
    return args[0] === args[1];
  } else if (
    args.length === 2 &&
    typeof args[0] === "number" &&
    typeof args[1] === "number"
  ) {
    return args[0] === args[1];
  } else if (
    args.length === 2 &&
    typeof args[0] === "string" &&
    typeof args[1] === "string"
  ) {
    return args[0] === args[1];
  } else if (args.length === 2 && isAtom(args[0]) && isAtom(args[1])) {
    return args[0].name === args[1].name;
  } else if (
    args.length === 2 &&
    isDottedList(args[0]) &&
    isDottedList(args[1])
  ) {
    return eqv([
      [...args[0].head, args[0].tail],
      [...args[1].head, args[1].tail],
    ]);
  } else if (
    args.length === 2 &&
    args[0] instanceof Array &&
    args[1] instanceof Array
  ) {
    const eqvPair = (x1: LispVal, x2: LispVal): boolean => {
      const result = eqv([x1, x2]);
      return !isLispError(result) && result;
    };
    if (args[0].length !== args[1].length) {
      return false;
    }
    for (let i = 0; i < args[0].length; i++) {
      if (!eqvPair(args[0][i], args[1][i])) {
        return false;
      }
    }
    return true;
  } else if (args.length === 2) {
    return false;
  } else {
    return {
      type: "NumArgs",
      expected: 2,
      found: args,
    };
  }
}

function equal(args: LispVal[]): boolean | LispError {
  if (args.length === 2) {
    const unpackEquals = <T>(
      arg1: LispVal,
      arg2: LispVal,
      unpacker: (value: LispVal) => T | LispError
    ) => {
      const unpacked1 = unpacker(arg1);
      if (isLispError(unpacked1)) {
        return false;
      }
      const unpacked2 = unpacker(arg2);
      if (isLispError(unpacked2)) {
        return false;
      }
      return unpacked1 === unpacked2;
    };
    const eqvEquals = eqv([args[0], args[1]]);
    return (
      unpackEquals(args[0], args[1], unpackNum) ||
      unpackEquals(args[0], args[1], unpackStr) ||
      unpackEquals(args[0], args[1], unpackBool) ||
      eqvEquals
    );
  } else {
    return {
      type: "NumArgs",
      expected: 2,
      found: args,
    };
  }
}

function print(args: LispVal[]): LispVal | LispError {
  args.forEach((item) =>
    process.stdout.write(typeof item === "string" ? item : showVal(item))
  );
  process.stdout.write("\n");
  return args;
}

function getTime(args: LispVal[]): LispVal | LispError {
  return Math.floor(Date.now() / 1000);
}

function listRef(args: LispVal[]): LispVal | LispError {
  if (args.length === 2) {
    if (typeof args[1] !== "number") {
      return {
        type: "TypeMismatch",
        expected: "number",
        found: args[1],
      };
    }
    if (args[0] instanceof Array) {
      return args[0][args[1]];
    } else {
      return {
        type: "TypeMismatch",
        expected: "list",
        found: args[0],
      };
    }
  } else {
    return {
      type: "NumArgs",
      expected: 2,
      found: args,
    };
  }
}

function stringToList(args: LispVal[]): LispVal | LispError {
  if (args.length === 1) {
    if (typeof args[0] !== "string") {
      return {
        type: "TypeMismatch",
        expected: "string",
        found: args[0],
      };
    }
    return Array.from(args[0]);
  } else {
    return {
      type: "NumArgs",
      expected: 1,
      found: args,
    };
  }
}

function nullCheck(args: LispVal[]): LispVal | LispError {
  if (args.length === 1) {
    if (args[0] instanceof Array) {
      return args[0].length === 0;
    }
    return {
      type: "TypeMismatch",
      expected: "string",
      found: args[0],
    };
  } else {
    return {
      type: "NumArgs",
      expected: 1,
      found: args,
    };
  }
}

function stringAppend(args: LispVal[]): LispVal | LispError {
  let result = "";
  for (const arg of args) {
    if (typeof arg !== "string") {
      return {
        type: "TypeMismatch",
        expected: "string",
        found: args,
      };
    }
    result += arg;
  }
  return result;
}

function charToInteger(args: LispVal[]): LispVal | LispError {
  if (args.length === 1) {
    if (typeof args[0] === "string" && args[0].length === 1) {
      return args[0].charCodeAt(0);
    }
    return {
      type: "TypeMismatch",
      expected: "char",
      found: args[0],
    };
  } else {
    return {
      type: "NumArgs",
      expected: 1,
      found: args,
    };
  }
}

function append(args: LispVal[]): LispVal | LispError {
  let result: LispVal[] = [];
  let resultDottedList = undefined;
  args.forEach((item, index) => {
    if (item instanceof Array) {
      result = result.concat(item);
    } else if (isDottedList(item) && index === args.length - 1) {
      console.log("fdjkds");
      result = result.concat(item.head);
      resultDottedList = {
        head: result,
        tail: item.tail,
      };
    } else {
      return {
        type: "TypeMismatch",
        expected: "list",
        found: item,
      };
    }
  });
  return resultDottedList ?? result;
}

function numberToString(args: LispVal[]): LispVal | LispError {
  if (args.length === 1) {
    if (typeof args[0] !== "number") {
      return {
        type: "TypeMismatch",
        expected: "string",
        found: args[0],
      };
    }
    return String(args[0]);
  } else {
    return {
      type: "NumArgs",
      expected: 1,
      found: args,
    };
  }
}

function list(args: LispVal[]): LispVal | LispError {
  return args;
}

function apply(func: LispVal, args: LispVal[]): LispVal | LispError {
  if (isPrimitiveFunc(func)) {
    return func.func(args);
  } else if (isFunc(func)) {
    if (func.params.length !== args.length && func.vararg === undefined) {
      return {
        type: "NumArgs",
        expected: func.params.length,
        found: args,
      };
    } else {
      const bindVarArgs = (arg: string | undefined, env: Env) => {
        if (!arg) {
          return env;
        }
        return bindVars(env, [
          { name: arg, value: args.slice(func.params.length) },
        ]);
      };
      const bindings = func.params.map((param, index) => {
        return { name: param, value: args[index] };
      });
      const resultBody = [];
      const closure = bindVarArgs(
        func.vararg,
        bindVars(func.closure, bindings)
      );
      for (const body of func.body) {
        const result = evalLisp(closure, body);
        if (isLispError(result)) {
          return result;
        }
        resultBody.push(result);
      }
      return resultBody[resultBody.length - 1];
    }
  } else {
    return {
      type: "NotFunction",
      message: "Unrecognized function",
      func: showVal(func),
    };
  }
}

function load(filename: string): LispVal[] | LispError {
  try {
    const file = fs.readFileSync(filename);
    return readExprList(file.toString());
  } catch (error) {
    return {
      type: "IOError",
      message: `Failed to load: ${filename}`,
    };
  }
}

export function evalLisp(env: Env, value: LispVal): LispVal | LispError {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value;
  } else if (typeof value === "boolean") {
    return value;
  } else if (isAtom(value)) {
    return getVar(env, value.name);
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "quote"
  ) {
    return value[1];
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "if" &&
    value.length === 4
  ) {
    const result = evalLisp(env, value[1]);
    if (isLispError(result)) {
      return result;
    }
    let resultValue;
    if (result === false) {
      resultValue = evalLisp(env, value[3]);
      if (isLispError(resultValue)) {
        return resultValue;
      }
    } else {
      resultValue = evalLisp(env, value[2]);
      if (isLispError(resultValue)) {
        return resultValue;
      }
    }
    return resultValue;
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "set!" &&
    isAtom(value[1]) &&
    value.length === 3
  ) {
    const result = evalLisp(env, value[2]);
    if (isLispError(result)) {
      return result;
    }
    return setVar(env, value[1].name, result);
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "load" &&
    typeof value[1] === "string" &&
    value.length === 2
  ) {
    const result = load(value[1]);
    if (isLispError(result)) {
      return result;
    }
    const resultBody: LispVal[] = [];
    for (const value of result) {
      const v = evalLisp(env, value);
      if (isLispError(v)) {
        return v;
      }
      resultBody.push(v);
    }
    return resultBody[resultBody.length - 1];
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "do" &&
    value[1] instanceof Array &&
    value[2] instanceof Array &&
    value.length >= 3
  ) {
    const new_env = { ...env };
    const stepForm: { name: string; val: LispVal }[] = [];
    value[1].forEach((item) => {
      if (item instanceof Array && item.length === 3 && isAtom(item[0])) {
        const init = evalLisp(new_env, item[1]);
        if (isLispError(init)) {
          return init;
        }
        new_env[item[0].name] = { ref: init };
        stepForm.push({ name: item[0].name, val: item[2] });
      } else {
        return {
          type: "Default",
        };
      }
    });
    for (;;) {
      const test = evalLisp(new_env, value[2][0]);
      if (isLispError(test)) {
        return test;
      }
      const testResult = unpackBool(test);
      if (isLispError(testResult)) {
        return testResult;
      }
      if (testResult) {
        if (value[2].length === 1) {
          return true;
        }
        const resultBlock = value[2].slice(1);
        const result: LispVal[] = [];
        for (const item of resultBlock) {
          const v = evalLisp(new_env, item);
          if (isLispError(v)) {
            return v;
          }
          result.push(v);
        }
        return result[result.length - 1];
      }
      if (value.length > 3) {
        const resultBlock = value.slice(3);
        for (const item of resultBlock) {
          const v = evalLisp(new_env, item);
          if (isLispError(v)) {
            return v;
          }
        }
      }
      const updateVal: { name: string; val: LispVal }[] = [];
      for (const form of stepForm) {
        const v = evalLisp(new_env, form.val);
        if (isLispError(v)) {
          return v;
        }
        updateVal.push({ name: form.name, val: v });
      }
      updateVal.forEach((item) => {
        new_env[item.name].ref = item.val;
      });
    }
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "let" &&
    value[1] instanceof Array &&
    value.length >= 3
  ) {
    const new_env = { ...env };
    for (const item of value[1]) {
      if (item instanceof Array && item.length === 2 && isAtom(item[0])) {
        const v = evalLisp(env, item[1]);
        if (isLispError(v)) {
          return v;
        }
        new_env[item[0].name] = { ref: v };
      } else {
        return {
          type: "Default",
        };
      }
    }
    const resultBody: LispVal[] = [];
    for (const item of value.slice(2)) {
      const result = evalLisp(new_env, item);
      if (isLispError(result)) {
        return result;
      }
      resultBody.push(result);
    }
    return resultBody[resultBody.length - 1];
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "let*" &&
    value[1] instanceof Array &&
    value.length >= 3
  ) {
    const new_env = { ...env };
    value[1].forEach((item) => {
      if (item instanceof Array && item.length === 2 && isAtom(item[0])) {
        const v = evalLisp(new_env, item[1]);
        if (isLispError(v)) {
          return v;
        }
        new_env[item[0].name] = { ref: v };
      } else {
        return {
          type: "Default",
        };
      }
    });
    const resultBody: LispVal[] = [];
    for (const item of value.slice(2)) {
      const result = evalLisp(new_env, item);
      if (isLispError(result)) {
        return result;
      }
      resultBody.push(result);
    }
    return resultBody[resultBody.length - 1];
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "define" &&
    isAtom(value[1]) &&
    value.length === 3
  ) {
    const result = evalLisp(env, value[2]);
    if (isLispError(result)) {
      return result;
    }
    return defineVar(env, value[1].name, result);
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "define" &&
    value[1] instanceof Array &&
    value[1].length > 0 &&
    isAtom(value[1][0]) &&
    value[2] instanceof Array &&
    value.length >= 3
  ) {
    return defineVar(env, value[1][0].name, {
      params: value[1].slice(1).map(showVal),
      vararg: undefined,
      body: value.slice(2),
      closure: env,
    });
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "define" &&
    isDottedList(value[1]) &&
    value[1].head instanceof Array &&
    value[1].head.length > 0 &&
    isAtom(value[1].head[0]) &&
    value[2] instanceof Array &&
    value.length >= 3
  ) {
    return defineVar(env, value[1].head[0].name, {
      params: value[1].head.slice(1).map(showVal),
      vararg: showVal(value[1].tail),
      body: value.slice(2),
      closure: env,
    });
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "lambda" &&
    value[1] instanceof Array &&
    value[2] instanceof Array &&
    value.length >= 3
  ) {
    return {
      params: value[1].map(showVal),
      vararg: undefined,
      body: value.slice(2),
      closure: env,
    };
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "lambda" &&
    isDottedList(value[1]) &&
    value[2] instanceof Array &&
    value.length >= 3
  ) {
    return {
      params: value[1].head.map(showVal),
      vararg: showVal(value[1].tail),
      body: value.slice(2),
      closure: env,
    };
  } else if (
    value instanceof Array &&
    isAtom(value[0]) &&
    value[0].name === "lambda" &&
    isAtom(value[1]) &&
    value[2] instanceof Array &&
    value.length >= 3
  ) {
    return {
      params: [],
      vararg: showVal(value[1]),
      body: value.slice(2),
      closure: env,
    };
  } else if (value instanceof Array && value.length > 0) {
    const func = evalLisp(env, value[0]);
    if (isLispError(func)) {
      return func;
    }
    const argVals: LispVal[] = [];
    for (const item of value.slice(1)) {
      const result = evalLisp(env, item);
      if (isLispError(result)) {
        return result;
      }
      argVals.push(result);
    }
    return apply(func, argVals);
  } else {
    return {
      type: "BadSpecialForm",
      message: "Unrecognized special form",
      form: value,
    };
  }
}
