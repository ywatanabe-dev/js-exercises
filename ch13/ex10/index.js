import * as fsPromises from "node:fs/promises";
import { join } from "path";

export async function fetchSumOfFileSizes(path) {
  const files = await fsPromises.readdir(path);
  let total = 0;
  await Promise.all(
    files.map((file) =>
      fsPromises.stat(join(path, file)).then((stats) => (total += stats.size))
    )
  );
  return total;
}
