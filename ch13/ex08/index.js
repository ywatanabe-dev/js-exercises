import * as fsPromises from "node:fs/promises";
import { join } from "path";

export async function fetchFirstFileSize(path) {
  const files = await fsPromises.readdir(path);
  if (files.length === 0) {
    return null;
  }
  const stats = await fsPromises.stat(join(path, files[0]));
  return stats.size;
}

export async function fetchSumOfFileSizes(path) {
  const files = await fsPromises.readdir(path);
  let total = 0;
  for (const file of files) {
    const stats = await fsPromises.stat(join(path, file));
    total += stats.size;
  }
  return total;
}
