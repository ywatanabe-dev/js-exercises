import * as fsPromises from "node:fs/promises";
import { join } from "path";

export async function* walk(rootPath) {
  const files = await fsPromises.readdir(rootPath);
  for (const file of files) {
    const path = join(rootPath, file);
    const stat = await fsPromises.stat(path);
    if (!stat.isFile() && !stat.isDirectory()) {
      continue;
    }
    yield {
      path,
      isDirectory: stat.isDirectory(),
    };
    if (stat.isDirectory()) {
      yield* walk(path);
    }
  }
}
