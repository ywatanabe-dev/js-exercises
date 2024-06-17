import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";

describe("fetchFirstFileSize", () => {
  test("fetchFirstFileSize ./ch13/ex04/txt1/ (1 file)", async () => {
    const size = await fetchFirstFileSize("./ch13/ex04/txt1/");
    expect(size).toBe(5);
  });

  test("fetchFirstFileSize ./ch13/ex04/txt2/ (0 file)", async () => {
    const size = await fetchFirstFileSize("./ch13/ex04/txt2/");
    expect(size).toBe(null);
  });

  test("fetchFirstFileSize ./ch13/ex04/txt0/ (not exist)", async () => {
    const f = jest.fn();
    try {
      await fetchFirstFileSize("./ch13/ex04/txt0/");
    } catch (err) {
      expect(err).toBeDefined();
      f();
    }
    expect(f).toHaveBeenCalled();
  });
});

describe("fetchSumOfFileSizes", () => {
  test("fetchSumOfFileSizes ./ch13/ex04/txt3/ (3 files)", async () => {
    const size = await fetchSumOfFileSizes("./ch13/ex04/txt3/");
    expect(size).toBe(15);
  });

  test("fetchSumOfFileSizes ./ch13/ex04/txt2/ (0 file)", async () => {
    const size = await fetchSumOfFileSizes("./ch13/ex04/txt2/");
    expect(size).toBe(0);
  });

  test("fetchSumOfFileSizes ./ch13/ex04/txt0/ (not exist)", async () => {
    const f = jest.fn();
    try {
      await fetchSumOfFileSizes("./ch13/ex04/txt0/");
    } catch (err) {
      expect(err).toBeDefined();
      f();
    }
    expect(f).toHaveBeenCalled();
  });
});
