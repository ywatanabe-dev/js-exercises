import sharp from "sharp";
import threads from "worker_threads";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

async function main() {
  if (process.argv.length < 2) {
    process.exit(1);
  }

  if (threads.isMainThread) {
    try {
      const { data, info } = await sharp(process.argv[2])
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
      const worker = new threads.Worker(__filename);
      worker.postMessage({ data, info }, [data.buffer]);

      const outputData = await new Promise((resolve, reject) => {
        worker.on("message", (response) => {
          resolve(response);
        });
        worker.on("error", () => {
          reject("an error occured.");
        });
      });

      await sharp(Buffer.from(outputData), {
        raw: {
          width: info.width,
          height: info.height,
          channels: 4,
        },
      })
        .png()
        .toFile("output.png");
      console.log("image converted completely.");
    } catch (e) {
      console.log(e);
    }
  } else {
    threads.parentPort.once("message", ({ data, info }) => {
      const outputData = new Uint8ClampedArray(data.length);
      const getPixelData = (x, y, c) => {
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > info.width - 1) x = info.width - 1;
        if (y > info.height - 1) y = info.height - 1;
        return data[(x + y * info.width) * 4 + c];
      };

      const w = [1, 4, 6, 4, 1];

      for (let x = 0; x < info.width; x++) {
        for (let y = 0; y < info.height; y++) {
          for (let c = 0; c < 4; c++) {
            let result = 0;
            for (let i = 0; i < 5; i++) {
              for (let j = 0; j < 5; j++) {
                result +=
                  ((w[i] * w[j]) / 256) * getPixelData(x - 2 + i, y - 2 + j, c);
              }
            }
            outputData[(x + y * info.width) * 4 + c] = result;
          }
        }
      }
      threads.parentPort.postMessage(outputData);
    });
  }
}

main();
