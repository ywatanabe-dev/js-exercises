import { showVal, unwordsList } from "./eval.ts";
import { LispVal } from "./parser.ts";

export type LispError =
  | NumArgs
  | TypeMismatch
  | ParserError
  | BadSpecialForm
  | NotFunction
  | UnboundVar
  | IOError
  | Default;

export function isLispError(value: unknown): value is LispError {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return value.hasOwnProperty("type");
}

type NumArgs = {
  type: "NumArgs";
  expected: number;
  found: LispVal[];
};

function isNumArgs(value: LispError): value is NumArgs {
  return value.type === "NumArgs";
}

type TypeMismatch = {
  type: "TypeMismatch";
  expected: string;
  found: LispVal;
};

function isTypeMismatch(value: LispError): value is TypeMismatch {
  return value.type === "TypeMismatch";
}

type ParserError = {
  type: "ParserError";
  error: Error;
};

function isParserError(value: LispError): value is ParserError {
  return value.type === "ParserError";
}

type BadSpecialForm = {
  type: "BadSpecialForm";
  message: string;
  form: LispVal;
};

function isBadSpecialForm(value: LispError): value is BadSpecialForm {
  return value.type === "BadSpecialForm";
}

type NotFunction = {
  type: "NotFunction";
  message: string;
  func: string;
};

function isNotFunction(value: LispError): value is NotFunction {
  return value.type === "NotFunction";
}

type UnboundVar = {
  type: "UnboundVar";
  message: string;
  varname: string;
};

function isUnboundVar(value: LispError): value is UnboundVar {
  return value.type === "UnboundVar";
}

type IOError = {
  type: "IOError";
  message: string;
};

function isIOError(value: LispError): value is IOError {
  return value.type === "IOError";
}

type Default = {
  type: "Default";
};

function isDefault(value: LispError): value is Default {
  return value.type === "Default";
}

export function showError(error: LispError): string {
  const show = (input: string) => '"' + input + '"';
  if (isUnboundVar(error)) {
    return error.message + ": " + error.varname;
  } else if (isBadSpecialForm(error)) {
    return error.message + ": " + showVal(error.form);
  } else if (isNotFunction(error)) {
    return error.message + ": " + show(error.func);
  } else if (isNumArgs(error)) {
    return (
      "Expected " +
      String(error.expected) +
      " args; found values " +
      unwordsList(error.found)
    );
  } else if (isTypeMismatch(error)) {
    return (
      "Invalid type: expected " +
      error.expected +
      ", found " +
      showVal(error.found)
    );
  } else if (isParserError(error)) {
    return "Parse error: " + error.error.message;
  } else if (isIOError(error)) {
    return error.message;
  } else {
    return "An error has occurred";
  }
}
