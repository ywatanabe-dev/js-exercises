import fs from "fs";

try {
  const memory1 = process.memoryUsage().heapUsed;

  const fd = await new Promise((resolve, reject) => {
    fs.open("./tmp/test.txt", (err, fd) => {
      if (err) {
        reject("open error.");
      }
      resolve(fd);
    });
  });

  const stats = await new Promise((resolve, reject) => {
    fs.fstat(fd, (err, stats) => {
      if (err) {
        reject("stat error.");
      }
      resolve(stats);
    });
  });
  const fileSize = stats.size;
  const buffer = Buffer.alloc(fileSize);
  await new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, buffer) => {
      if (err) {
        reject("read error.");
      }
      fs.close(fd, (err) => {
        if (err) {
          reject("close error.");
        }
        resolve();
      });
    });
  });

  // NOTE: file.txt の内容をアップロード
  await fetch("http://localhost:8000/hello.txt", {
    method: "PUT",
    body: buffer,
    duplex: "half",
  });

  const memory2 = process.memoryUsage().heapUsed;
  const memoryUsed = memory2 - memory1;
  console.log(memoryUsed);
} catch (e) {
  console.log(e);
}
