export function* genPrime() {
  let n = 2;
  const primes = [];
  while (true) {
    const result = primes.every((p) => {
      return n % p !== 0;
    });
    if (result) {
      yield n;
      primes.push(n);
    }
    n++;
  }
}
