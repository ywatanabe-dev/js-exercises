(() => {
  const div = document.getElementById("editor-front");
  const input = document.getElementById("editor-back");
  div.addEventListener("click", () => {
    input.focus();
  });
  input.addEventListener("focusin", () => {
    div.style.backgroundColor = "#c0c0c0";
  });
  input.addEventListener("focusout", () => {
    div.style.backgroundColor = "#ffffff";
  });
  input.addEventListener("input", (event) => {
    div.textContent = event.target.value;
  });
})();
