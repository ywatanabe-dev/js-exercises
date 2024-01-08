import * as readline from "node:readline/promises";

class DefaultMap<K, V> extends Map<K, V> {
  private defaultValue: V;

  constructor(defalutValue: V) {
    super();
    this.defaultValue = defalutValue;
  }

  override get(key: K) {
    const value = super.get(key);
    if (value) {
      return value;
    } else {
      return this.defaultValue;
    }
  }
}

export class wordHistogram {
  private wordCounts: DefaultMap<string, number>;
  private totalWords: number;

  constructor() {
    this.wordCounts = new DefaultMap(0);
    this.totalWords = 0;
  }

  add(text: string) {
    const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
    const words = [...matches].map((r) => r[0]);

    for (const word of words) {
      const count = this.wordCounts.get(word);
      this.wordCounts.set(word, count + 1);
      this.totalWords++;
    }
  }

  toString() {
    let entries = [...this.wordCounts];

    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      } else {
        return b[1] - a[1];
      }
    });

    for (const entry of entries) {
      entry[1] = (entry[1] / this.totalWords) * 100;
    }

    entries = entries.filter((entry) => entry[1] >= 0.5);

    const lines = entries.map(
      ([l, n]) =>
        `${l.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`
    );

    return lines.join("\n");
  }
}

export async function histogramFromStdin() {
  process.stdin.setEncoding("utf-8");
  const histogram = new wordHistogram();
  const rl = readline.createInterface(process.stdin);

  for await (const line of rl) {
    histogram.add(line);
  }

  return histogram;
}
