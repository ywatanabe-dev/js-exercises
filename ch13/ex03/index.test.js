import { readdir, stat } from "./index.js";

describe("readdir", () => {
  test("readdir ../ex01, ../ex02", async () => {
    readdir("./ch13/ex01/")
      .then((files) => {
        expect(files).toStrictEqual(["index.js", "index.md"]);
        return readdir("./ch13/ex02/");
      })
      .then((files) => {
        expect(files).toStrictEqual(["index.js"]);
      });
  });

  test("readdir ../ex0(not exist), ../ex01", async () => {
    const f1 = jest.fn();
    const f2 = jest.fn();
    const f3 = jest.fn();
    readdir("./ch13/ex0/")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((files) => {
        f1();
        return readdir("./ch13/ex01/");
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((files) => {
        f2();
      })
      .catch((error) => {
        f3();
        expect(error).toBeDefined();
      })
      .finally(() => {
        expect(f1).not.toHaveBeenCalled();
        expect(f2).not.toHaveBeenCalled();
        expect(f3).toHaveBeenCalled();
      });
  });
});

describe("stat", () => {
  test("stat ../ex01/index.js, ../ex02/index.js", async () => {
    stat("./ch13/ex01/index.js")
      .then((stats) => {
        expect(stats.birthtime).toBeDefined();
        expect(stats.birthtimeMs).toBeDefined();
        return stat("./ch13/ex02/index.js");
      })
      .then((stats) => {
        expect(stats.birthtime).toBeDefined();
        expect(stats.birthtimeMs).toBeDefined();
      });
  });

  test("stat ../ex0(not exist)/index.js, ../ex01/index.js", async () => {
    const f1 = jest.fn();
    const f2 = jest.fn();
    const f3 = jest.fn();
    stat("./ch13/ex0/index.js")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((stats) => {
        f1();
        return stat("./ch13/ex01/index.js");
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((stats) => {
        f2();
      })
      .catch((error) => {
        f3();
        expect(error).toBeDefined();
      })
      .finally(() => {
        expect(f1).not.toHaveBeenCalled();
        expect(f2).not.toHaveBeenCalled();
        expect(f3).toHaveBeenCalled();
      });
  });
});
