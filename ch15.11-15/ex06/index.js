const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", () => {
  const toDoTasks = sessionStorage.getItem("toDoTasks");
  if (toDoTasks !== null) {
    const tasks = JSON.parse(toDoTasks);
    for (const task of tasks) {
      appendToDoItem(task);
    }
  } else {
    sessionStorage.toDoTasks = JSON.stringify([]);
  }
});

window.addEventListener("storage", (e) => {
  if (e.key === "toDoTasks") {
    const newTasks = JSON.parse(e.newValue);
    list.textContent = "";
    for (const task of newTasks) {
      appendToDoItem(task);
    }
  }
});

form.addEventListener("submit", (e) => {
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
  };
  const tasks = JSON.parse(sessionStorage.toDoTasks);
  tasks.push(task);
  sessionStorage.toDoTasks = JSON.stringify(tasks);

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
  toggle.addEventListener("change", (e) => {
    task.status = e.target.checked ? "completed" : "active";
    const tasks = JSON.parse(sessionStorage.toDoTasks);
    tasks.forEach((item) => {
      if (item.id === task.id) {
        item.status = task.status;
      }
    });
    sessionStorage.toDoTasks = JSON.stringify(tasks);
    label.style.textDecorationLine =
      task.status === "completed" ? "line-through" : "none";
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    const prevTasks = JSON.parse(sessionStorage.toDoTasks);
    const newTasks = prevTasks.filter((item) => item.id !== task.id);
    sessionStorage.toDoTasks = JSON.stringify(newTasks);
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
