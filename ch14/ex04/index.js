export class HiraganaChar {
  constructor(character) {
    this.character = character;
    const unicode = [...character];
    if (
      unicode.length !== 1 ||
      unicode[0].codePointAt(0) < 0x3041 ||
      unicode[0].codePointAt(0) > 0x3096
    ) {
      throw new Error();
    }
    this.codePoint = unicode[0].codePointAt(0);
  }

  [Symbol.toPrimitive](expectType) {
    if (expectType === "string") {
      return this.character;
    } else if (expectType === "number") {
      return this.codePoint;
    } else if (expectType === "default") {
      return this.character;
    }
  }
}
