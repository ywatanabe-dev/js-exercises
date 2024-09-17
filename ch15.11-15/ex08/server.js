import WebSocket, { WebSocketServer } from "ws";

const port = 3003;
const wss = new WebSocketServer({ port });

// 他のクライアントにメッセージを転送する
wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const message = data.toString();
    const waitTIme = Math.floor(Math.random() * 1000 * 5);
    console.log(message, `wait ${waitTIme}ms`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client != ws) {
        setTimeout(() => {
          client.send(message);
        }, waitTIme);
      }
    });
  });
});
