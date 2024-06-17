export function* genCount() {
  let count = 0;

  while (true) {
    try {
      yield count;
      count++;
    } catch (e) {
      count = 0;
    }
  }
}
