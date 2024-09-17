function sendRequest(message) {
  const socket = new WebSocket("ws://localhost:3003");
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("request timeout"), 5000);
    const id = crypto.randomUUID();
    socket.onopen = () => {
      const data = {
        id,
        message,
      };
      socket.send(JSON.stringify(data));
    };
    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.id === id) {
        resolve(response.message);
      }
    };
    socket.onerror = (event) => {
      reject("socket connection error");
    };
  });
}

function setReplyClient() {
  const socket = new WebSocket("ws://localhost:3003");
  socket.onmessage = (event) => {
    const response = JSON.parse(event.data);
    const data = {
      id: response.id,
      message: "Hello, " + response.message,
    };
    socket.send(JSON.stringify(data));
  };
}

document.addEventListener("DOMContentLoaded", () => {
  setReplyClient();
  document.querySelectorAll(".message-form").forEach((form) => {
    const input = form.querySelector(".form");
    const reply = form.querySelector(".reply");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (input.value.trim() === "") {
        return;
      }
      const message = input.value.trim();
      input.value = "";

      try {
        const response = await sendRequest(message);
        reply.textContent = "返信：" + response;
      } catch (error) {
        reply.textContent = "エラー：" + error;
      }
    });
  });
});
