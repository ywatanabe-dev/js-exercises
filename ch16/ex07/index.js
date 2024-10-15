import * as fs from "node:fs";

export function checkEntry(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      //console.log(err);
      if (err !== null) {
        reject(err);
        return;
      }
      if (stats.isFile()) {
        resolve("file");
        return;
      }
      if (stats.isDirectory()) {
        resolve("directory");
        return;
      }

      // ブロックデバイス
      if (stats.isBlockDevice()) {
        resolve("blockDevice");
        return;
      }

      // キャラクタデバイス
      if (stats.isCharacterDevice()) {
        resolve("characterDevice");
        return;
      }

      // FIFO
      if (stats.isFIFO()) {
        resolve("fifo");
        return;
      }

      // ソケット
      if (stats.isSocket()) {
        resolve("socket");
        return;
      }

      // シンボリックリンク(fs.statでは使えない)
      /*
      if (stats.isSymbolicLink()) {
        resolve("symbolicLink");
        return;
      }
      */
    });
  });
}
