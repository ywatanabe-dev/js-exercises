import * as fsPromises from "node:fs/promises";
import { join } from "path";

/*
function fetchFirstFileSize(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }
    if (files.length === 0) {
      callback(null, null);
      return;
    }

    fs.stat(join(path, files[0]), (err, stats) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, stats.size);
    });
  });
}
*/

export function fetchFirstFileSize(path) {
  return fsPromises.readdir(path).then((files) => {
    if (files.length === 0) {
      return null;
    }
    return fsPromises.stat(join(path, files[0])).then((stats) => stats.size);
  });
}

/*
function fetchSumOfFileSizes(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }

    let total = 0;
    const rest = [...files];

    function iter() {
      if (rest.length === 0) {
        callback(null, total);
        return;
      }

      const next = rest.pop();
      fs.stat(join(path, next), (err, stats) => {
        if (err) {
          callback(err);
          return;
        }
        total += stats.size;
        iter();
      });
    }
    iter();
  });
}
*/

export function fetchSumOfFileSizes(path) {
  return fsPromises.readdir(path).then((files) => {
    let p = Promise.resolve(0);
    for (const file of files) {
      p = p.then((total) =>
        fsPromises.stat(join(path, file)).then((stats) => {
          return total + stats.size;
        })
      );
    }
    return p;
  });
}
