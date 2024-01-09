function isObject(a) {
  return (typeof a === "object" || typeof a === "function") && a !== null;
}

/**
 * Convert Object to primitive value.
 * see https://262.ecma-international.org/5.1/#sec-9.1,
 * https://262.ecma-international.org/5.1/#sec-8.12.8
 */
function toPremitive(a) {
  if (!isObject(a)) {
    return a;
  }
  if (a instanceof Date) {
    return a.toString();
  } else {
    if(typeof a?.valueOf === "function") {
      const value = a.valueOf();
      if (!isObject(value)) {
        return value;
      }
    }
    if(typeof a?.toString === "function") {
      const str = a.toString();
      if (!isObject(str)) {
        return str;
      }
    }
  }
  throw TypeError;
}

/**
 * Convert Object to primitive value with hint Number.
 * see https://262.ecma-international.org/5.1/#sec-9.1,
 * https://262.ecma-international.org/5.1/#sec-8.12.8
 */
function toPremitiveWithHintNumber(a) {
  if (!isObject(a)) {
    return a;
  }
  if(typeof a?.valueOf === "function") {
    const value = a.valueOf();
    if (!isObject(value)) {
      return value;
    }
  }
  if(typeof a?.toString === "function") {
    const str = a.toString();
    if (!isObject(str)) {
      return str;
    }
  }
  throw TypeError;
}

/**
 * Abstract Equality Comparison Algorithm.
 * see https://262.ecma-international.org/5.1/#sec-11.9.3
 */
export function eq(a, b) {
  if (typeof a === typeof b) {
    if (a === undefined) return true;
    if (a === null) return true;
    if (typeof a === "number") {
      if (isNaN(a) || isNaN(b)) return false;
      if (a === b) return true;
      if (Object.is(a, 0) && Object.is(b, -0)) return true;
      if (Object.is(a, -0) && Object.is(b, 0)) return true;
      return false;
    }
    if (typeof a === "string") {
      return a === b;
    }
    if (typeof a === "boolean") {
      return a === b;
    }
    return Object.is(a, b);
  }
  if (a === null && b === undefined) return true;
  if (a === undefined && b === null) return true;
  if (typeof a === "number" && typeof b === "string") {
    return eq(a, Number(b));
  }
  if (typeof a === "string" && typeof b === "number") {
    return eq(Number(a), b);
  }
  if (typeof a === "boolean") {
    return eq(Number(a), b);
  }
  if (typeof b === "boolean") {
    return eq(a, Number(b));
  }
  if ((typeof a === "string" || typeof a === "number") && isObject(b)) {
    return eq(a, toPremitive(b));
  }
  if (isObject(a) && (typeof b === "string" || typeof b === "number")) {
    return eq(toPremitive(a), b);
  }
  return false;
}

/**
 * Abstract Relational Comparison Algorithm.
 * see https://262.ecma-international.org/5.1/#sec-11.8.3,
 * https://262.ecma-international.org/5.1/#sec-11.8.5
 */
export function lte(a, b) {
  const py = toPremitiveWithHintNumber(a);
  const px = toPremitiveWithHintNumber(b);
  if (typeof px !== "string" || typeof py !== "string") {
    const nx = Number(px);
    const ny = Number(py);
    return ny < nx || nx === ny;
  } else {
    return py < px || px === py;
  }
}
