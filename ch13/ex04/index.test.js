import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";

describe("fetchFirstFileSize", () => {
  test("fetchFirstFileSize ./ch13/ex04/txt1/ (1 file)", async () => {
    const f = jest.fn();
    await fetchFirstFileSize("./ch13/ex04/txt1/").then((size) => {
      expect(size).toBe(5);
      f();
    });
    expect(f).toHaveBeenCalled();
  });

  /*
  test("fetchFirstFileSize ./ch13/ex04/txt2/ (0 file)", async () => {
    const f = jest.fn();
    await fetchFirstFileSize("./ch13/ex04/txt2/").then((size) => {
      expect(size).toBe(null);
      f();
    });
    expect(f).toHaveBeenCalled();
  });
  */

  test("fetchFirstFileSize ./ch13/ex04/txt0/ (not exist)", async () => {
    const f = jest.fn();
    await fetchFirstFileSize("./ch13/ex04/txt0/").catch((err) => {
      expect(err).toBeDefined();
      f();
    });
    expect(f).toHaveBeenCalled();
  });
});

describe("fetchSumOfFileSizes", () => {
  test("fetchSumOfFileSizes ./ch13/ex04/txt3/ (3 files)", async () => {
    const f = jest.fn();
    await fetchSumOfFileSizes("./ch13/ex04/txt3/").then((size) => {
      expect(size).toBe(15);
      f();
    });
    expect(f).toHaveBeenCalled();
  });

  /*
  test("fetchSumOfFileSizes ./ch13/ex04/txt2/ (0 file)", async () => {
    const f = jest.fn();
    await fetchSumOfFileSizes("./ch13/ex04/txt2/").then((size) => {
      expect(size).toBe(0);
      f();
    });
    expect(f).toHaveBeenCalled();
  });
  */

  test("fetchSumOfFileSizes ./ch13/ex04/txt0/ (not exist)", async () => {
    const f = jest.fn();
    await fetchSumOfFileSizes("./ch13/ex04/txt0/").catch((err) => {
      expect(err).toBeDefined();
      f();
    });
    expect(f).toHaveBeenCalled();
  });
});
