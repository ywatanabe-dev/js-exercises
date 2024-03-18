/*
function fizzbuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}
*/
export function fizzbuzz(n) {
  [...Array(n)]
    .map((_, i) => {
      return (
        ((i + 1) % 15 === 0 && "FizzBuzz") ||
        ((i + 1) % 3 === 0 && "Fizz") ||
        ((i + 1) % 5 === 0 && "Buzz") ||
        i + 1
      );
    })
    .forEach((value) => {
      console.log(value);
    });
}

/*
function sumOfSquaredDifference(f, g) {
  let result = 0;
  for (let i = 0; i < f.length; i++) {
    result += (f[i] - g[i]) ** 2;
  }
  return result;
}
*/
export function sumOfSquaredDifference(f, g) {
  return [...Array(f.length)]
    .map((_, i) => {
      (f[i] - g[i]) ** 2;
    })
    .reduce((x, y) => x + y, 0);
}

/*
function sumOfEvensIsLargerThan42(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      continue;
    }
    sum += array[i];
    if (sum >= 42) {
      return true;
    }
  }
  return false;
}
*/
export function sumOfEvensIsLargerThan42(array) {
  return (
    [...Array(array.length)]
      .filter((i) => i % 2 === 0)
      .reduce((x, y) => x + y, 0) >= 42
  );
}
