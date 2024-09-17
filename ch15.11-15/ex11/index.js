const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//ctx.fillStyle = "black";
//ctx.fillRect(0, 0, 729, 729);
const worker = new Worker("drawSierpinskiCarpet.js");
worker.postMessage({
  width: 729,
  height: 729,
});
worker.onmessage = (event) => {
  ctx.putImageData(event.data, 0, 0);
};
