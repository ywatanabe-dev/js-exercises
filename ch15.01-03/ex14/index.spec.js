import { test, expect } from "@playwright/test";

test.describe("ex14", () => {
  test("default", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
    expect(
      await page.getByTestId("food1").evaluate((node) => node.hidden)
    ).toBe(false);
    expect(
      await page.getByTestId("stationery1").evaluate((node) => node.hidden)
    ).toBe(false);
    expect(
      await page.getByTestId("stationery2").evaluate((node) => node.hidden)
    ).toBe(false);
  });
  test("select foods", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
    const select = await page.$("#category-select");
    await select.selectOption("食品");
    expect(
      await page.getByTestId("food1").evaluate((node) => node.hidden)
    ).toBe(false);
    expect(
      await page.getByTestId("stationery1").evaluate((node) => node.hidden)
    ).toBe(true);
    expect(
      await page.getByTestId("stationery2").evaluate((node) => node.hidden)
    ).toBe(true);
  });
  test("select stationerys", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
    const select = await page.$("#category-select");
    await select.selectOption("文房具");
    expect(
      await page.getByTestId("food1").evaluate((node) => node.hidden)
    ).toBe(true);
    expect(
      await page.getByTestId("stationery1").evaluate((node) => node.hidden)
    ).toBe(false);
    expect(
      await page.getByTestId("stationery2").evaluate((node) => node.hidden)
    ).toBe(false);
  });
  test("select default", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
    const select = await page.$("#category-select");
    await select.selectOption("食品");
    await select.selectOption("すべて");
    expect(
      await page.getByTestId("food1").evaluate((node) => node.hidden)
    ).toBe(false);
    expect(
      await page.getByTestId("stationery1").evaluate((node) => node.hidden)
    ).toBe(false);
    expect(
      await page.getByTestId("stationery2").evaluate((node) => node.hidden)
    ).toBe(false);
  });
});
