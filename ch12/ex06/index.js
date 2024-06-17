import { readdirSync, statSync } from "fs";
import { join } from "path";

export function* walk(rootPath) {
  const files = readdirSync(rootPath);
  for (const file of files) {
    const path = join(rootPath, file);
    const stat = statSync(path);
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
