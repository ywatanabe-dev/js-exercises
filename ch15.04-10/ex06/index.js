const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    const list = this.shadowRoot.querySelector("#todo-list");
    const input = this.shadowRoot.querySelector("#new-todo");

    this.form.addEventListener("submit", (e) => {
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
      toggle.type = "checkbox";
      toggle.addEventListener("change", (e) => {
        label.style.textDecorationLine = e.target.checked ? "line-through" : "";
      });

      const destroy = document.createElement("button");
      destroy.textContent = "❌";
      destroy.addEventListener("click", () => {
        list.removeChild(elem);
      });

      list.prepend(elem);
      const div = document.createElement("div");
      elem.appendChild(div);
      div.appendChild(toggle);
      div.appendChild(label);
      div.appendChild(destroy);
    });
  }
}

customElements.define("todo-app", TodoApp);
