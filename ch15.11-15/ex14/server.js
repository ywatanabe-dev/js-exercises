import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import url from "node:url";

// ES Modules で __dirname を取得
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function listTasksHandler(_url, _req, res) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });

  setTimeout(() => {
    res.write('data: {"value": "こんにちわ\\n", "done": false}');
    res.write("\n\n");
  }, 2000);

  setTimeout(() => {
    res.write('data:{"value": "さようなら", "done": true}');
    res.write("\n\n");
    res.end();
  }, 5000);
}

// "/path/to/file.ext" の URL に対して "./contents/path/to/file.ext" のファイルを返すハンドラ
async function serveContentsHandler(url, _req, res) {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
  };

  try {
    const reqPath = url.pathname;
    // Linux/MacOS/Windows で共通してファイルパスを構成できる処理
    const filePath = path.join(
      __dirname,
      "contents",
      reqPath === "/" ? "index.html" : path.join(...reqPath.split("/"))
    );

    const content = await fs.readFile(filePath);

    const ext = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (error) {
    if (error.code == "ENOENT") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Content Not Found", "utf-8");
    } else {
      res.writeHead(500);
      res.end(`Internal Error: ${error.code}`, "utf-8");
    }
  }
}

// Cookie による簡易的な認証/認可を行うミドルウェア
function cookieAuthzMiddleware(_url, req, res, params) {
  const cookieData = req.headers.cookie || "";
  const fields = cookieData.split(";").map((data) => data.trim());

  // セッションに対して ID を付与し、セッション毎に Task API のデータを分離する
  const sidPrefix = "sid=";
  const sidField = fields.find((data) => data.startsWith(sidPrefix));
  const sid = sidField ? sidField.slice(sidPrefix.length) : crypto.randomUUID();
  console.log("session:", sid);
  params.__sid = sid;

  // HttpOnly を有効にしてクライアントの JavaScript から Cookie を参照できないようにする
  res.setHeader(
    "Set-Cookie",
    `sid=${encodeURIComponent(sid)}; Domain=localhost; Path=/; HttpOnly;`
  );
  return true;
}

// ルーティングを行う関数
function routes(...routeHandlers) {
  return async (req, res) => {
    console.log("request:", req.method, req.url);

    // クエリパラメータを含む URL をパース
    const url = new URL(`http://localhost${req.url}`);
    const method = req.method;
    const reqPath = url.pathname;

    for (const routeConfig of routeHandlers) {
      // [メソッド, パス, メインハンドラ, ...ミドルウェア] の形式でルートを定義
      const [routeMethod, routePath, ...handlers] = routeConfig;
      const mainHandler = handlers.shift();
      const middlewares = handlers;

      if (method !== routeMethod) continue;

      const routeParts = routePath.split("/");
      const reqParts = reqPath.split("/");

      if (routeParts.length !== reqParts.length && !routePath.includes("*"))
        continue;

      const params = {};
      let match = true;

      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i] === "*") {
          // ワイルドカードセグメントの場合、残りのパスを全て受け入れる
          params["*"] = reqParts.slice(i).join("/");
          break;
        } else if (
          routeParts[i].startsWith("{") &&
          routeParts[i].endsWith("}")
        ) {
          // パラメータセグメントの場合、パラメータ名をキーにして値を取得
          const paramName = routeParts[i].slice(1, -1);
          params[paramName] = reqParts[i];
        } else if (routeParts[i] !== reqParts[i]) {
          // 一致しない場合はマッチ不成立で終了
          match = false;
          break;
        }
      }

      if (match) {
        // Middleware の実行
        for (const middleware of middlewares) {
          const result = await middleware(url, req, res, params);
          if (result === false) return; // Middleware がfalseを返した場合、以降の処理を中断
        }
        await mainHandler(url, req, res, params);
        return;
      }
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found", "utf-8");
  };
}

async function main() {
  const authz = cookieAuthzMiddleware;

  http
    .createServer(async function (req, res) {
      await routes(
        ["GET", "/message", listTasksHandler, authz],
        ["GET", "/*", serveContentsHandler, authz]
      )(req, res);
    })
    .listen(3000);
  console.log("Server running at http://localhost:3000/");
}

await main();
