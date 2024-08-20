import { test, expect } from "@playwright/test";

test.describe("ch15.04-10/ex05", () => {
  test("default", async ({ page }) => {
    await page.goto("/ch15.04-10/ex05/index.html");
    expect(
      await page
        .getByTestId("circle1")
        .evaluate((node) => node.style.borderColor)
    ).toBe("initial");
    expect(
      await page
        .getByTestId("circle2")
        .evaluate((node) => node.style.borderColor)
    ).toBe("blue");
    expect(
      await page
        .getByTestId("circle3")
        .evaluate((node) => node.style.borderColor)
    ).toBe("green");
  });
});
