export const fizzbuzz = () => [...Array(100)].map((_, i) => i + 1).map(i => i % 15 === 0 ? "FizzBuzz" : (i % 3 === 0 ? "Fizz" : (i % 5 === 0 ? "Buzz" : i.toString()))).join("\n").concat("\n")
