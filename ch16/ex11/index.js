import * as net from "net";
import { Readable } from "stream";

export const server = net.createServer();

const contents = `
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="greeting">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;

const newContents = (name, greeting) => `
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="greeting">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
    <div>
      <p>
        ${name}: ${greeting}
      </p>
    </div>
  </body>
</html>`;

server.on("connection", (socket) => {
  let data = "";
  socket.on("data", (chunk) => {
    data += chunk;
    if (data.includes("\r\n\r\n")) {
      const header = data.split("\r\n")[0];
      const method = header.split(" ")[0];
      const path = header.split(" ")[1];
      if (method === "GET" && path === "/") {
        socket.write("HTTP/1.1 200 OK\r\n");
        socket.write("Content-Type: text/html\r\n");
        socket.write(`Content-Length: ${contents.length}\r\n`);
        socket.write("Connection: close\r\n");
        socket.write("\r\n");
        const stream = Readable.from([contents]);
        stream.pipe(socket);
        stream.on("end", () => {
          socket.end();
        });
      } else if (method === "POST" && path === "/greeting") {
        const lines = data.split("\r\n");
        const body = lines[lines.length - 1];
        const values = body.match("name=(.*)&greeting=(.*)");
        const name = decodeURI(values[1]);
        const greeting = decodeURI(values[2]);
        const resBody = newContents(name, greeting);
        socket.write("HTTP/1.1 200 OK\r\n");
        socket.write("Content-Type: text/html\r\n");
        socket.write(`Content-Length: ${resBody.length}\r\n`);
        socket.write("Connection: close\r\n");
        socket.write("\r\n");
        const stream = Readable.from([resBody]);
        stream.pipe(socket);
        stream.on("end", () => {
          socket.end();
        });
      } else if (
        (method === "GET" && path === "/greeting") ||
        (method === "POST" && path === "/")
      ) {
        socket.write("HTTP/1.1 405 Method Not Allowed\r\n");
        socket.write("Content-Type: text/plain\r\n");
        socket.write("\r\n");
        socket.write("405 Method Not Allowed");
        socket.end();
      } else {
        socket.write("HTTP/1.1 404 Not Found\r\n");
        socket.write("Content-Type: text/plain\r\n");
        socket.write("\r\n");
        socket.write("404 Not Found");
        socket.end();
      }
    }
  });
});

// server.listen(8000, () => console.log("server open port:8000"));
