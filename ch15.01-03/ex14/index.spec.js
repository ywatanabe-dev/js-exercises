import { test, expect } from "@playwright/test";

test.describe("ex14", () => {
  test("default", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
    const products = await page.$("#productList");
    expect(
      await products.$eval("li[data-testid='food1']", (node) => node.hidden)
    ).toBe(false);
    expect(
      await products.$eval(
        "li[data-testid='stationery1']",
        (node) => node.hidden
      )
    ).toBe(false);
    expect(
      await products.$eval(
        "li[data-testid='stationery2']",
        (node) => node.hidden
      )
    ).toBe(false);
  });
  test("select foods", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
    const select = await page.$("#category-select");
    await select.selectOption("食品");
    const products = await page.$("#productList");
    expect(
      await products.$eval("li[data-testid='food1']", (node) => node.hidden)
    ).toBe(false);
    expect(
      await products.$eval(
        "li[data-testid='stationery1']",
        (node) => node.hidden
      )
    ).toBe(true);
    expect(
      await products.$eval(
        "li[data-testid='stationery2']",
        (node) => node.hidden
      )
    ).toBe(true);
  });
  test("select stationerys", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
    const select = await page.$("#category-select");
    await select.selectOption("文房具");
    const products = await page.$("#productList");
    expect(
      await products.$eval("li[data-testid='food1']", (node) => node.hidden)
    ).toBe(true);
    expect(
      await products.$eval(
        "li[data-testid='stationery1']",
        (node) => node.hidden
      )
    ).toBe(false);
    expect(
      await products.$eval(
        "li[data-testid='stationery2']",
        (node) => node.hidden
      )
    ).toBe(false);
  });
  test("select default", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
    const select = await page.$("#category-select");
    await select.selectOption("食品");
    await select.selectOption("すべて");
    const products = await page.$("#productList");
    expect(
      await products.$eval("li[data-testid='food1']", (node) => node.hidden)
    ).toBe(false);
    expect(
      await products.$eval(
        "li[data-testid='stationery1']",
        (node) => node.hidden
      )
    ).toBe(false);
    expect(
      await products.$eval(
        "li[data-testid='stationery2']",
        (node) => node.hidden
      )
    ).toBe(false);
  });
});
