export function addEscapeSequence1(input: string): string {
  return Array.from(input)
    .map((c) => {
      let result: string;
      if (c === "\0") {
        result = "\\0";
      } else if (c === "\b") {
        result = "\\b";
      } else if (c === "\t") {
        result = "\\t";
      } else if (c === "\n") {
        result = "\\n";
      } else if (c === "\v") {
        result = "\\v";
      } else if (c === "\f") {
        result = "\\f";
      } else if (c === "\r") {
        result = "\\r";
      } else if (c === '"') {
        result = '\\"';
      } else if (c === "'") {
        result = "\\'";
      } else if (c === "\\") {
        result = "\\\\";
      } else {
        result = c;
      }
      return result;
    })
    .join("");
}

export function addEscapeSequence2(input: string): string {
  return Array.from(input)
    .map((c) => {
      switch (c) {
        case "\0":
          return "\\0";
        case "\b":
          return "\\b";
        case "\t":
          return "\\t";
        case "\n":
          return "\\n";
        case "\v":
          return "\\v";
        case "\f":
          return "\\f";
        case "\r":
          return "\\r";
        case '"':
          return '\\"';
        case "'":
          return "\\'";
        case "\\":
          return "\\\\";
        default:
          return c;
      }
    })
    .join("");
}
