import { expect, test } from "@playwright/test";

test.describe("integrity test", () => {
  test("call test1 and 2", async ({ page }) => {
    let called = 0;
    page.on("console", (msg) => {
      called++;
      if (msg.type() === "log") {
        expect(msg.text()).toBe("OK1");
      }
      if (msg.type() === "error") {
        expect(msg.text()).toMatch(
          /Failed to find a valid digest in the 'integrity'.*/
        );
      }
    });
    await page.goto("/ch15.01-03/ex03");
    expect(called).toBe(2);
  });
});
