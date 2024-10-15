import net from "net";

for (let i = 0; i < 20000; i++) {
  const socket = new net.Socket();
  socket.connect(8000, "localhost", () => {
    console.log(`socket${i} connect.`);
  });
  socket.on("close", () => {
    console.log(`socket${i} close.`);
  });
  socket.on("error", (error) => {
    console.log(i, error);
    process.exit(1);
  });
}
