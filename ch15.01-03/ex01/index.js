const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

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

  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.setAttribute("type", "checkbox");
  toggle.addEventListener("change", (e) => {
    label.style.textDecorationLine = e.target.checked ? "line-through" : "";
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.innerText = "❌";
  destroy.addEventListener("click", () => {
    list.removeChild(elem);
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
  const div = document.createElement("div");
  elem.appendChild(div);
  div.appendChild(toggle);
  div.appendChild(label);
  div.appendChild(destroy);
});
