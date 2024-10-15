import fs from "fs";

if (process.argv.length < 3) {
  process.exit(0);
}

fs.truncate(process.argv[2], 30, () => {});
