import { test, expect } from "@playwright/test";

async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}
async function checkToDo(page, index) {
  await page
    .locator("#todo-list")
    .getByRole("listitem")
    .nth(index)
    .getByRole("checkbox")
    .check();
}

/*
async function deleteToDo(page, index) {
  await page
    .locator("#todo-list")
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
}
*/

async function countToDos(page) {
  return await page.locator("#todo-list").getByRole("listitem").count();
}

function queryToDo(page, index) {
  return page.locator("#todo-list").getByRole("listitem").nth(index);
}

test.describe("ch15.04-10/ex11", () => {
  test("default", async ({ page }) => {
    await page.goto("/ch15.04-10/ex11/index.html");
    await addToDo(page, "test1");
    await addToDo(page, "test2");
    expect(await countToDos(page)).toBe(2);
    const label1 = queryToDo(page, 0).getByText("test1");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");
    const label2 = queryToDo(page, 1).getByText("test2");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("Active: 2, Completed: 0", async ({ page }) => {
    await page.goto("/ch15.04-10/ex11/index.html");
    await addToDo(page, "test1");
    await addToDo(page, "test2");
    await page.getByRole("listitem").getByText("Active").click();
    expect(await countToDos(page)).toBe(2);
    const label1 = queryToDo(page, 0).getByText("test1");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");
    const label2 = queryToDo(page, 1).getByText("test2");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
    await page.getByRole("listitem").getByText("Completed").click();
    expect(await countToDos(page)).toBe(0);
    await page.getByRole("listitem").getByText("All").click();
    expect(await countToDos(page)).toBe(2);
    const label3 = queryToDo(page, 0).getByText("test1");
    await expect(label3).toBeVisible();
    await expect(label3).toHaveCSS("text-decoration-line", "none");
    const label4 = queryToDo(page, 1).getByText("test2");
    await expect(label4).toBeVisible();
    await expect(label4).toHaveCSS("text-decoration-line", "none");
  });

  test("Active: 0, Completed: 2", async ({ page }) => {
    await page.goto("/ch15.04-10/ex11/index.html");
    await addToDo(page, "test1");
    await addToDo(page, "test2");
    await checkToDo(page, 0);
    await checkToDo(page, 1);
    await page.getByRole("listitem").getByText("Active").click();
    expect(await countToDos(page)).toBe(0);
    await page.getByRole("listitem").getByText("Completed").click();
    expect(await countToDos(page)).toBe(2);
    const label1 = queryToDo(page, 0).getByText("test1");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "line-through");
    const label2 = queryToDo(page, 1).getByText("test2");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
    await page.getByRole("listitem").getByText("All").click();
    expect(await countToDos(page)).toBe(2);
    const label3 = queryToDo(page, 0).getByText("test1");
    await expect(label3).toBeVisible();
    await expect(label3).toHaveCSS("text-decoration-line", "line-through");
    const label4 = queryToDo(page, 1).getByText("test2");
    await expect(label4).toBeVisible();
    await expect(label4).toHaveCSS("text-decoration-line", "line-through");
  });

  test("Active: 1, Completed: 1", async ({ page }) => {
    await page.goto("/ch15.04-10/ex11/index.html");
    await addToDo(page, "test1");
    await addToDo(page, "test2");
    await checkToDo(page, 0);
    await page.getByRole("listitem").getByText("Active").click();
    expect(await countToDos(page)).toBe(1);
    const label1 = queryToDo(page, 0).getByText("test2");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");
    await page.getByRole("listitem").getByText("Completed").click();
    expect(await countToDos(page)).toBe(1);
    const label2 = queryToDo(page, 0).getByText("test1");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
    await page.getByRole("listitem").getByText("All").click();
    expect(await countToDos(page)).toBe(2);
    const label3 = queryToDo(page, 0).getByText("test1");
    await expect(label3).toBeVisible();
    await expect(label3).toHaveCSS("text-decoration-line", "line-through");
    const label4 = queryToDo(page, 1).getByText("test2");
    await expect(label4).toBeVisible();
    await expect(label4).toHaveCSS("text-decoration-line", "none");
  });
});
