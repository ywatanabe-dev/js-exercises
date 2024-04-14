export function any(...f_array) {
  return (...n) => {
    return f_array.map((f) => f(...n)).some((input) => input);
  };
}

export function catching(f, g) {
  return (...input) => {
    try {
      return f(...input);
    } catch (error) {
      return g(error);
    }
  };
}
