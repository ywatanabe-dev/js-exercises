const secondhand = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "line"
);
secondhand.setAttribute("x1", "50");
secondhand.setAttribute("y1", "50");
secondhand.setAttribute("x2", "50");
secondhand.setAttribute("y2", "15");
document.querySelector("#clock .hands").appendChild(secondhand);

(function updateClock() {
  // SVG時計の画像を更新して現在時刻を表示する。
  const now = new Date(); // 現在時刻。
  const sec = now.getSeconds(); // 秒。
  const min = now.getMinutes() + sec / 60; // 小数部を持つ分。
  const hour = (now.getHours() % 12) + min / 60; // 小数部を持つ時。
  const secangle = sec * 6;
  const minangle = min * 6; // 1分あたり6度。
  const hourangle = hour * 30; // 1時間あたり30度。
  // 時計の針のSVG要素を取得する。
  const minhand = document.querySelector("#clock .minutehand");
  const hourhand = document.querySelector("#clock .hourhand");
  // SVG属性を設定して、時計盤の中で回転する。
  minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
  secondhand.setAttribute("transform", `rotate(${secangle},50,50)`);
  // 10秒後にこの関数を再度実行する。
  setTimeout(updateClock, 1);
})(); // ここで関数を即座に実行していることに注意。
