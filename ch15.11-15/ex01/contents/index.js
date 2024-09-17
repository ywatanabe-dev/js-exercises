const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

async function fetchAPI(url, opt) {
  const response = await fetch(url, opt);
  if (
    !response.ok ||
    response.headers.get("Content-Type") !== "application/json; charset=UTF-8"
  ) {
    throw new Error(
      `Unexpected response status ${response.status} or content type`
    );
  }
  return response;
}

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetchAPI(`http://${location.host}/api/tasks`);
    const tasks = await response.json();
    for (const task of tasks.items) {
      appendToDoItem(task);
    }
  } catch (error) {
    alert(error);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  const task = {
    name: todo,
    status: "active",
  };

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoElement で ToDo リストの要素として追加しなさい
  try {
    const response = await fetchAPI(`http://${location.host}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    appendToDoItem(newTask);
  } catch (error) {
    alert(error);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  toggle.addEventListener("change", async (e) => {
    task.status = e.target.checked ? "completed" : "active";
    try {
      const response = await fetchAPI(
        `http://${location.host}/api/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        }
      );
      const newTask = await response.json();
      label.style.textDecorationLine =
        newTask.status === "completed" ? "line-through" : "none";
    } catch (error) {
      e.target.checked = e.target.checked ? false : true;
      alert(error);
    }
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    try {
      await fetchAPI(`http://${location.host}/api/tasks/${task.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      list.removeChild(elem);
    } catch (error) {
      alert(error);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
  const div = document.createElement("div");
  elem.appendChild(div);
  div.appendChild(toggle);
  div.appendChild(label);
  div.appendChild(destroy);
}
