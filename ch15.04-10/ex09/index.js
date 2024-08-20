document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    const outputData = new Uint8ClampedArray(imageData.data.length);

    // TODO: ここで imageData.data を参照して outputData に結果を格納
    const getPixelData = (x, y, c) => {
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > img.width - 1) x = img.width - 1;
      if (y > img.height - 1) y = img.height - 1;
      return data[(x + y * img.width) * 4 + c];
    };

    const w = [1, 4, 6, 4, 1];

    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        for (let c = 0; c < 4; c++) {
          let result = 0;
          for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
              result +=
                ((w[i] * w[j]) / 256) * getPixelData(x - 2 + i, y - 2 + j, c);
            }
          }
          outputData[(x + y * img.width) * 4 + c] = result;
        }
      }
    }

    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
