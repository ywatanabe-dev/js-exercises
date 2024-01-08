import { promisify } from "util";
import { exec } from "child_process";

describe("charfreq", () => {
  it("変更前と結果が同じであること", async () => {
    const stdout = await promisify(exec)(
      "node ch02/ex05/index.js < ch02/ex05/charfreq.js"
    );
    const expectedStdout = await promisify(exec)(
      "node ch02/ex05/charfreq.js < ch02/ex05/charfreq.js"
    );
    expect(stdout.toString()).toBe(expectedStdout.toString());
  });
});
