import fs from "fs";

const memory1 = process.memoryUsage().heapUsed;

// NOTE: file.txt の内容をアップロード
await fetch("http://localhost:8000/hello.txt", {
  method: "PUT",
  body: fs.createReadStream("./tmp/test.txt"),
  duplex: "half",
});

const memory2 = process.memoryUsage().heapUsed;
const memoryUsed = memory2 - memory1;
// 100MBの画像をアップロード時
// fs.read : 1500000 byte
// fs.createReadStream : 2500000 byte
console.log(memoryUsed);
