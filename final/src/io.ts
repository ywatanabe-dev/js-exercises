process.stdin.resume();
process.stdin.setEncoding("utf8");
import * as readline from "node:readline/promises";
import { evalLisp, primitiveBindings, readExpr, showVal } from "./eval.ts";
import { isLispError, showError } from "./error.ts";
import { Env } from "./variable.ts";

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
