import { LispError } from "./error.ts";
import { LispVal } from "./parser.ts";

export type Env = Record<string, { ref: LispVal }>;

function isBound(env: Env, name: string): boolean {
  return Object.keys(env).indexOf(name) >= 0;
}

export function getVar(env: Env, name: string): LispVal | LispError {
  const value = Object.entries(env).find(([n, v]) => n === name);
  if (!value) {
    return {
      type: "UnboundVar",
      message: "Getting an unbound variable ",
      varname: name,
    };
  }
  return value[1].ref;
}

export function setVar(
  env: Env,
  name: string,
  val: LispVal
): LispVal | LispError {
  const value = Object.entries(env).find(([n, v]) => n === name);
  if (!value) {
    return {
      type: "UnboundVar",
      message: "Setting an unbound variable ",
      varname: name,
    };
  }
  env[value[0]].ref = val;
  return val;
}

export function defineVar(
  env: Env,
  name: string,
  val: LispVal
): LispVal | LispError {
  if (isBound(env, name)) {
    return setVar(env, name, val);
  } else {
    env[name] = { ref: val };
    return val;
  }
}

export function bindVars(
  env: Env,
  bindings: { name: string; value: LispVal }[]
): Env {
  const new_env = { ...env };
  bindings.map(({ name, value }) => (new_env[name] = { ref: value }));
  return new_env;
}
