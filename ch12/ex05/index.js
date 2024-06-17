import { openSync, readSync, closeSync } from "fs";

// ASCIIコードの文書にのみ対応(文字サイズ1byte決め打ち)
export function* readLines(filePath) {
  const fd = openSync(filePath, "r");
  const buffer_size = 10;
  try {
    let result = "";
    while (true) {
      const buffer = new Uint8Array(buffer_size);
      readSync(fd, buffer);
      const str = String.fromCharCode(...buffer);
      let pos,
        start = 0;
      // Buffer内で\nの位置を探す
      while (true) {
        pos = str.indexOf("\n", start);
        if (pos < 0) {
          // \nがなかったら抜ける
          break;
        }
        // \nがあれば蓄積とそこまでの文字列を返す
        result += str.slice(start, pos);
        yield result;
        result = "";
        start = pos + 1;
      }
      const end = str.indexOf("\0", start);
      if (end >= 0) {
        // Buffer内に\0があったら蓄積とそこまでの文字列を返して終了
        result += str.slice(start, end);
        yield result;
        break;
      }
      // Buffer内に\0がなかったら蓄積する
      result += str.slice(start, buffer_size);
    }
  } finally {
    closeSync(fd);
  }
}
