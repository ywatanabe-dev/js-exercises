const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

document.querySelector("#all").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState(null, "", "/ch15.04-10/ex12/all");
  renderTodos(todos);
});

document.querySelector("#active").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState(null, "", "/ch15.04-10/ex12/active");
  renderTodos(todos.filter((todo) => !todo.completed));
});

document.querySelector("#completed").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState(null, "", "/ch15.04-10/ex12/completed");
  renderTodos(todos.filter((todo) => todo.completed));
});
