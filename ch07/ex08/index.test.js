import { reverse } from "./index.js";

test("reserve", () => {
  expect(reverse("abc123")).toBe("321cba");
  expect(reverse("𠮷野家")).toBe("家野𠮷");
  expect(reverse("家族 👨‍👨‍👧‍👧")).toBe("👨‍👨‍👧‍👧 族家");
});
