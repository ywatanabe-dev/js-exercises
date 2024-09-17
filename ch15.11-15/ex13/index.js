const chat = document.querySelector(".chat-box");
const form = document.querySelector(".message-form");
const input = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (input.value.trim() === "") {
    return;
  }
  const message = input.value.trim();
  input.value = "";

  const userMessageDiv = document.createElement("div");
  userMessageDiv.className = "message user";
  userMessageDiv.textContent = message;
  chat.appendChild(userMessageDiv);

  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({
      model: "gemma2:2b",
      messages: [{ role: "user", content: message }],
    }),
  });

  const botMessageDiv = document.createElement("div");
  botMessageDiv.className = "message bot";
  chat.appendChild(botMessageDiv);

  const reader = response.body.getReader();
  let reply = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const responses = new TextDecoder("utf-8").decode(value).trim().split("\n");
    for (const response of responses) {
      const result = JSON.parse(response);
      reply += result.message.content;
      botMessageDiv.textContent = reply;
      chat.scrollTop = chat.scrollHeight;
    }
  }
});
