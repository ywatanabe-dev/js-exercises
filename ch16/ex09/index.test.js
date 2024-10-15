import * as request from "supertest";
import { serve } from "./index.js";

describe("request /test/mirror", () => {
  let server;
  beforeAll(() => {
    server = serve(`${__dirname}/tmp`, 3000);
  });
  afterAll(() => {
    server.close();
  });

  test("GET", async () => {
    const response = await request(server).get("/test/mirror");
    expect(response.status).toBe(200);
    expect(response.text).not.toBe("");
  });

  test("POST", async () => {
    const response = await request(server).post("/test/mirror");
    expect(response.status).toBe(200);
    expect(response.text).not.toBe("");
  });
});

describe("request files", () => {
  let server;
  beforeAll(() => {
    server = serve(`${__dirname}/tmp`, 3000);
  });
  afterAll(() => {
    server.close();
  });

  test("GET html", async () => {
    const response = await request(server).get("/test.html");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toBe("text/html; charset=utf-8");
  });

  test("GET js", async () => {
    const response = await request(server).get("/foo.js");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toBe(
      "text/javascript; charset=utf-8"
    );
  });

  test("GET txt", async () => {
    const response = await request(server).get("/test.txt");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toBe("text/plain; charset=utf-8");
  });

  test("404", async () => {
    const response = await request(server).get("/foo");
    expect(response.status).toBe(404);
  });
});
