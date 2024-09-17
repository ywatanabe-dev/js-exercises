function drawSierpinskiCarpet(buffer, x1, y1, x2, y2, w) {
  if (x2 - x1 < 3 || y2 - y1 < 3) {
    return;
  }

  for (let x = x1 + (x2 - x1) / 3; x < x1 + ((x2 - x1) * 2) / 3; x++) {
    for (let y = y1 + (y2 - y1) / 3; y < y1 + ((y2 - y1) * 2) / 3; y++) {
      buffer[y * w + x] = 0xffffffff;
    }
  }

  drawSierpinskiCarpet(
    buffer,
    x1,
    y1,
    (x2 - x1) / 3 + x1,
    (y2 - y1) / 3 + y1,
    w
  );
  drawSierpinskiCarpet(
    buffer,
    (x2 - x1) / 3 + x1,
    y1,
    ((x2 - x1) * 2) / 3 + x1,
    (y2 - y1) / 3 + y1,
    w
  );
  drawSierpinskiCarpet(
    buffer,
    ((x2 - x1) * 2) / 3 + x1,
    y1,
    x2,
    (y2 - y1) / 3 + y1,
    w
  );
  drawSierpinskiCarpet(
    buffer,
    x1,
    (y2 - y1) / 3 + y1,
    (x2 - x1) / 3 + x1,
    ((y2 - y1) * 2) / 3 + y1,
    w
  );
  drawSierpinskiCarpet(
    buffer,
    ((x2 - x1) * 2) / 3 + x1,
    (y2 - y1) / 3 + y1,
    x2,
    ((y2 - y1) * 2) / 3 + y1,
    w
  );
  drawSierpinskiCarpet(
    buffer,
    x1,
    ((y2 - y1) * 2) / 3 + y1,
    (x2 - x1) / 3 + x1,
    y2,
    w
  );
  drawSierpinskiCarpet(
    buffer,
    (x2 - x1) / 3 + x1,
    ((y2 - y1) * 2) / 3 + y1,
    ((x2 - x1) * 2) / 3 + x1,
    y2,
    w
  );
  drawSierpinskiCarpet(
    buffer,
    ((x2 - x1) * 2) / 3 + x1,
    ((y2 - y1) * 2) / 3 + y1,
    x2,
    y2,
    w
  );
}

onmessage = (event) => {
  const width = event.data.width;
  const height = event.data.height;
  const imageData = new ImageData(width, height);
  const buffer = new Uint32Array(imageData.data.buffer);
  for (let i = 0; i < imageData.width * imageData.height; i++) {
    buffer[i] = 0xff000000;
  }
  drawSierpinskiCarpet(buffer, 0, 0, width, height, width);
  postMessage(imageData);
};
