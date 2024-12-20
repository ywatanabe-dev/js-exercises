process.stdin.resume();
process.stdin.setEncoding("utf8");
import * as readline from "node:readline/promises";
import {
  evalLisp,
  primitiveBindings,
  readExpr,
  readExprList,
  showVal,
} from "./eval.ts";
import { isLispError, showError } from "./error.ts";
import { Env } from "./variable.ts";
import fs from "fs";

function evalString(env: Env, expr: string): string {
  const result = readExpr(expr);
  if (isLispError(result)) {
    return showError(result);
  }
  const value = evalLisp(env, result);
  if (isLispError(value)) {
    return showError(value);
  }
  return showVal(value);
}

function evalAndPrint(env: Env, expr: string) {
  console.log(evalString(env, expr));
}

function main(argv: string[]) {
  if (argv.length > 2) {
    try {
      const file = fs.readFileSync(argv[2]);
      const value = readExprList(file.toString());
      if (isLispError(value)) {
        console.log(showError(value));
        return;
      }
      evalLisp(primitiveBindings, value);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt(">>");
  rl.prompt();

  rl.on("line", (line: string) => {
    if (line === "quit") {
      rl.close();
      return;
    }
    evalAndPrint(primitiveBindings, line);
    rl.setPrompt(">>");
    rl.prompt();
  });
}

main(process.argv);
