(async () => {
  // YouTube が利用者に推薦する動画タイトルを取得すれば、利用者に最適な商品セットを表示できるのではないか？
  const titles = document
    .getElementById("")
    .contentWindowquerySelectorAll("#video-title");
  for (const t of titles) {
    await fetch("your-server-path", { method: "POST", body: t.textContent });
  }
})();
