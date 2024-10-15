import * as express from "express";
import * as path from "path";
import * as fs from "fs";

export function serve(rootDirectory, port) {
  const app = express();

  app.all("/test/mirror", (req, res) => {
    res.set("Content-Type", "text/plain; charset=UTF-8");
    res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`);
    const headers = req.rawHeaders;
    for (let i = 0; i < headers.length; i += 2) {
      res.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
    }
    res.write("\r\n");
    req.pipe(res);
  });

  app.all("*", (req, res) => {
    const endpoint = req.path;
    let filename = endpoint.substring(1);
    filename = filename.replace(/\.\.\//g, "");
    filename = path.resolve(rootDirectory, filename);

    let type;
    switch (path.extname(filename)) {
      case ".html":
      case ".htm":
        type = "text/html";
        break;
      case ".js":
        type = "text/javascript";
        break;
      case ".css":
        type = "text/css";
        break;
      case ".png":
        type = "image/png";
        break;
      case ".txt":
        type = "text/plain";
        break;
      default:
        type = "application/octet-stream";
        break;
    }

    const stream = fs.createReadStream(filename);
    stream.once("readable", () => {
      res.set("Content-Type", type);
      res.status(200);
      stream.pipe(res);
    });
    stream.on("error", (err) => {
      res.set("Content-Type", "text/plain; charset=UTF-8");
      res.status(404);
      res.end(err.message);
    });
  });

  return app.listen(parseInt(port) || 8000);
}
