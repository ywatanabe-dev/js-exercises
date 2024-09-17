function convertImage(data, width, height) {
  const outputData = new Uint8ClampedArray(data.length);

  const getPixelData = (x, y, c) => {
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > width - 1) x = width - 1;
    if (y > height - 1) y = height - 1;
    return data[(x + y * width) * 4 + c];
  };

  const w = [1, 4, 6, 4, 1];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      for (let c = 0; c < 4; c++) {
        let result = 0;
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            result +=
              ((w[i] * w[j]) / 256) * getPixelData(x - 2 + i, y - 2 + j, c);
          }
        }
        outputData[(x + y * width) * 4 + c] = result;
      }
    }
  }

  return new ImageData(outputData, width, height);
}

onmessage = (event) => {
  const outputImageData = convertImage(
    event.data.data,
    event.data.width,
    event.data.height
  );
  postMessage(outputImageData);
};
