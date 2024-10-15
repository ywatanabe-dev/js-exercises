import * as request from "supertest";
import { server } from "./index.js";

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

const newContents = `
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
        test: hello world.
      </p>
    </div>
  </body>
</html>`;

describe("socket server", () => {
  beforeAll(() => {
    server.listen(8000, () => console.log("server open port:8000"));
  });
  afterAll(() => {
    server.close();
  });

  test("HTTP status 404", async () => {
    const response = await request(server).get("/foo");
    expect(response.status).toBe(404);
  });

  test("HTTP status 405(1)", async () => {
    const response = await request(server).post("/");
    expect(response.status).toBe(405);
  });

  test("HTTP status 405(2)", async () => {
    const response = await request(server).get("/greeting");
    expect(response.status).toBe(405);
  });

  test("get /", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe(contents);
  });

  test("post /greeting", async () => {
    const response = await request(server)
      .post("/greeting")
      .send(encodeURI("name=test&greeting=hello world."));
    expect(response.status).toBe(200);
    expect(response.text).toBe(newContents);
  });
});
