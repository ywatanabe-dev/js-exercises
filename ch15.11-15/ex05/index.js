const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const broadcast = new BroadcastChannel("update");

broadcast.onmessage = async (event) => {
  if (event.data.type === "update") {
    list.textContent = "";
    const tasks = await readAllEntries();
    for (const task of tasks) {
      appendToDoItem(task);
    }
  }
};

function initDB(db) {
  db.createObjectStore("tasks", { keyPath: "id" });
}

async function writeEntries(entry) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("tasks", 1);
    request.onerror = reject;
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(["tasks"], "readwrite");
      transaction.onerror = reject;
      const store = transaction.objectStore("tasks");
      store.put(entry);
      transaction.oncomplete = () => {
        broadcast.postMessage({ type: "update" });
        resolve(db);
      };
    };
    request.onupgradeneeded = () => {
      initDB(request.result);
    };
  });
}

async function readAllEntries() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("tasks", 1);
    request.onerror = reject;
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(["tasks"], "readwrite");
      transaction.onerror = reject;
      const store = transaction.objectStore("tasks");
      const result = [];
      store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          result.push({
            id: cursor.key,
            name: cursor.value.name,
            status: cursor.value.status,
            date: cursor.value.date,
          });
          cursor.continue();
        } else {
          result.sort((a, b) => a.date - b.date);
          resolve(result);
        }
      };
    };
    request.onupgradeneeded = () => {
      initDB(request.result);
    };
  });
}

async function removeEntry(key) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("tasks", 1);
    request.onerror = reject;
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(["tasks"], "readwrite");
      transaction.onerror = reject;
      const store = transaction.objectStore("tasks");
      store.delete(key);
      transaction.oncomplete = () => {
        broadcast.postMessage({ type: "update" });
        resolve(db);
      };
    };
    request.onupgradeneeded = () => {
      initDB(request.result);
    };
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const tasks = await readAllEntries();
  for (const task of tasks) {
    appendToDoItem(task);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  const task = {
    id: crypto.randomUUID(),
    name: todo,
    status: "active",
    date: Date.now(),
  };
  await writeEntries(task);

  appendToDoItem(task);
});

function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  toggle.addEventListener("change", async (e) => {
    task.status = e.target.checked ? "completed" : "active";
    await writeEntries({
      id: task.id,
      name: task.name,
      status: task.status,
      date: task.date,
    });
    label.style.textDecorationLine =
      task.status === "completed" ? "line-through" : "none";
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    await removeEntry(task.id);
    list.removeChild(elem);
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
  const div = document.createElement("div");
  elem.appendChild(div);
  div.appendChild(toggle);
  div.appendChild(label);
  div.appendChild(destroy);
}
