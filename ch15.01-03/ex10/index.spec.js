import { test, expect } from "@playwright/test";

function gotoTestTarget(page) {
  return page.goto("/ch15.01-03/ex10/index.html");
}

function getDiv(page) {
  return page.getByTestId("editor-front");
}

function getInput(page) {
  return page.getByRole("textbox");
}

test.describe("div & input Site", () => {
  test("When it clicks the div, then it focus the input", async ({ page }) => {
    await gotoTestTarget(page);
    await getDiv(page).click();
    await expect(getInput(page)).toBeFocused();
  });

  test("When it focus the input, the color of the div is silver", async ({
    page,
  }) => {
    await gotoTestTarget(page);
    await expect(getDiv(page)).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
    await getDiv(page).click();
    await expect(getDiv(page)).toHaveCSS(
      "background-color",
      "rgb(192, 192, 192)"
    );
    await getInput(page).blur();
    await expect(getDiv(page)).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
  });

  test("When it input texts, then the div displays texts", async ({ page }) => {
    await gotoTestTarget(page);
    await getInput(page).fill("Hello!");
    await expect(getDiv(page)).toHaveText("Hello!");
  });

  test("When it input dangerous texts, then the div displays sanitiezed texts", async ({
    page,
  }) => {
    await gotoTestTarget(page);
    await getInput(page).fill("<div>Hello!</div>");
    await expect(getDiv(page)).toHaveText("<div>Hello!</div>");
  });
});
