import fs from "fs";
import path from "path";
import iconv from "iconv-lite";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readStream = fs.createReadStream(path.resolve(__dirname, "hello.txt"));
const converterStream = iconv.decodeStream("sjis");
const outputStream = readStream.pipe(converterStream);

let text = "";

outputStream.on("data", (data) => {
  text += data;
});

outputStream.on("end", () => {
  console.log(text);
});
