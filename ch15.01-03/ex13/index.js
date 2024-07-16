(() => {
  const nav = document.querySelectorAll("nav a");
  console.log(nav);
  const firstProduct = document.querySelector(".product-item");
  console.log(firstProduct);
  const cartImg = document.querySelector("img[alt='カート']");
  console.log(cartImg);
  const price = document.querySelectorAll(".price");
  console.log(price);
  const productImg = document.querySelectorAll(".product-item img");
  console.log(productImg);
  const button = document.querySelector(".search-bar button");
  console.log(button);
  const p = document.querySelector("footer p");
  console.log(p);
  const evenProducts = document.querySelectorAll(
    ".product-item:nth-child(even)"
  );
  console.log(evenProducts);
  const accountImg = document.querySelector("img[alt='アカウント']");
  console.log(accountImg);
  const about = document.querySelector("nav a[href='#about']");
  console.log(about);
})();
