import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import url from "node:url";

// ES Modules で __dirname を取得
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Task API のモデル

/* Task の型
type Task = {
  id: number;
  name: string;
  status: "active" | "completed";
};
*/

const taskListStore = {}; // {[sid]: {tasks: [Task, ...], currentId: number}} のデータを保持するストア

const notFoundError = { status: 404, message: "not found" };
const badRequestError = (message) => ({ status: 400, message });

// Task 一覧を取得
function listTasks(sid) {
  return { ok: true, data: taskListStore[sid]?.tasks || [] };
}

// ID を指定して Task を取得
function getTask(sid, id) {
  const tasks = taskListStore[sid]?.tasks;
  if (!tasks) {
    return { ok: false, error: notFoundError };
  }

  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return { ok: false, error: notFoundError };
  }

  return { ok: true, data: task };
}

// Task を作成
function createTask(sid, { name }) {
  let taskEntry = taskListStore[sid];
  if (!taskEntry) {
    taskEntry = { tasks: [], currentId: 1 };
    taskListStore[sid] = taskEntry;
  }
  const tasks = taskEntry.tasks;

  const task = { id: taskEntry.currentId, name, status: "active" };
  const { ok, error } = validateTask(task);
  if (!ok) {
    return { ok: false, error };
  }
  tasks.push(task);
  taskEntry.currentId++;
  return { ok: true, data: task };
}

// Task を更新
function patchTask(sid, id, { name, status }) {
  const tasks = taskListStore[sid]?.tasks;
  if (!tasks) {
    return { ok: false, error: notFoundError };
  }

  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return { ok: false, error: notFoundError };
  }

  const task = tasks[index];
  const newTask = {
    id: task.id,
    name: name || task.name,
    status: status || task.status,
  };

  const { ok, error } = validateTask(task);
  if (!ok) {
    return { ok: false, error };
  }

  tasks[index] = newTask;
  return { ok: true, data: newTask };
}

// Task を削除
function deleteTask(sid, id) {
  const tasks = taskListStore[sid]?.tasks;
  if (!tasks) {
    return { ok: false, error: notFoundError };
  }

  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return { ok: false, error: notFoundError };
  }
  tasks.splice(index, 1);
  return { ok: true };
}

function validateTask({ name, status }) {
  if (!name) {
    return { ok: false, error: badRequestError("name is required") };
  }
  if (status && !["active", "completed"].includes(status)) {
    return { ok: false, error: badRequestError("invalid status") };
  }
  return { ok: true };
}

// Task API のハンドラ
async function listTasksHandler(_url, _req, res, params) {
  try {
    const { ok, data, error } = listTasks(params.__sid);
    if (!ok) {
      respondJson(res, error.status, { message: error.message });
      return;
    }
    respondJson(res, 200, { items: data });
  } catch (error) {
    respondJson(res, 500, { message: `${error}` });
  }
}
async function getTaskHandler(_url, _req, res, params) {
  try {
    const id = Number(params.id);
    const { ok, data, error } = getTask(params.__sid, id);
    if (!ok) {
      respondJson(res, error.status, { message: error.message });
      return;
    }
    respondJson(res, 200, data);
  } catch (error) {
    respondJson(res, 500, { message: `${error}` });
  }
}
async function createTaskHandler(_url, req, res, params) {
  try {
    const body = await readBodyJson(req);
    const { ok, data, error } = createTask(params.__sid, body);
    if (!ok) {
      respondJson(res, error.status, { message: error.message });
      return;
    }
    respondJson(res, 201, data);
  } catch (error) {
    respondJson(res, 500, { message: `${error}` });
  }
}
async function patchTaskHandler(_url, req, res, params) {
  try {
    const id = Number(params.id);
    const body = await readBodyJson(req);
    const { ok, data, error } = patchTask(params.__sid, id, body);
    if (!ok) {
      respondJson(res, error.status, { message: error.message });
      return;
    }
    respondJson(res, 200, data);
  } catch (error) {
    respondJson(res, 500, { message: `${error}` });
  }
}
async function deleteTaskHandler(_url, _req, res, params) {
  try {
    const id = Number(params.id);
    const { ok, error } = deleteTask(params.__sid, id);
    if (!ok) {
      respondJson(res, error.status, { message: error.message });
      return;
    }
    respondJson(res, 204);
  } catch (error) {
    respondJson(res, 500, { message: `${error}` });
  }
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
      reqPath === "/" ? "index.html" : path.join(...reqPath.split("/")),
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
    `sid=${encodeURIComponent(sid)}; SameSite=Lax; Path=/; HttpOnly;`,
  );
  return true;
}

// リクエストボディを読み込む関数
async function readBodyJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(JSON.parse(body));
    });
    req.on("error", reject);
  });
}

// JSON レスポンスを返す関数
function respondJson(res, status, data = undefined) {
  console.log("response:", status, data);
  res.writeHead(status, { "Content-Type": "application/json; charset=UTF-8" });
  if (data) {
    res.end(JSON.stringify(data));
  } else {
    res.end();
  }
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
        ["GET", "/api/tasks", listTasksHandler, authz],
        ["GET", "/api/tasks/{id}", getTaskHandler, authz],
        ["POST", "/api/tasks", createTaskHandler, authz],
        ["PATCH", "/api/tasks/{id}", patchTaskHandler, authz],
        ["DELETE", "/api/tasks/{id}", deleteTaskHandler, authz],
        ["GET", "/*", serveContentsHandler, authz],
      )(req, res);
    })
    .listen(3000);
  console.log("Server running at http://localhost:3000/");
}

await main();
