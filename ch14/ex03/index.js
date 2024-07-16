export class IgnoreAccentPattern {
  constructor(pattern) {
    if (pattern instanceof RegExp) {
      this.regexp = new RegExp(
        this.#normalize(pattern.source),
        "u" + pattern.flags
      );
    } else {
      this.regexp = new RegExp(`${this.#normalize(pattern)}`, "u");
    }
  }

  #normalize(input) {
    return [...input.normalize("NFD")]
      .filter((cp) => {
        const point = cp.codePointAt(0);
        return point < 0x0300 || point > 0x036f;
      })
      .join("");
  }

  [Symbol.search](s) {
    return this.#normalize(s).search(this.regexp);
  }

  [Symbol.match](s) {
    return this.#normalize(s).match(this.regexp);
  }

  [Symbol.replace](s, replacement) {
    return this.#normalize(s).replace(this.regexp, replacement);
  }
}
