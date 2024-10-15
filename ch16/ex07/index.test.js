import { checkEntry } from "./index.js";

describe("checkEntry", () => {
  it("file not found", async () => {
    let error = undefined;
    try {
      await checkEntry("./ch16/ex07/foo");
    } catch (e) {
      error = e;
    }
    expect(error).not.toBe(undefined);
  });

  it("file", async () => {
    const res = await checkEntry("./ch16/ex07/file");
    expect(res).toBe("file");
  });

  it("directory", async () => {
    const res = await checkEntry("./ch16/ex07/directory");
    expect(res).toBe("directory");
  });

  it("characterDevice", async () => {
    const res = await checkEntry("/dev/tty");
    expect(res).toBe("characterDevice");
  });
});
