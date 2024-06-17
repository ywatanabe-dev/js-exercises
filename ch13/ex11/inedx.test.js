import { retryWithExponentialBackoff } from "./index.js";

describe("retryWithExponentialBackoff", () => {
  test("0 retry => success", async () => {
    const mock = jest.fn(async () => true);
    const value = await retryWithExponentialBackoff(mock, 0);
    expect(value).toBe(true);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test("1 retry => success (maxRetry = 1)", async () => {
    let count = 0;
    const mock = jest.fn(async () => {
      if (count > 0) {
        return true;
      }
      count++;
      throw new Error("error");
    });
    const value = await retryWithExponentialBackoff(mock, 1);
    expect(value).toBe(true);
    expect(mock).toHaveBeenCalledTimes(2);
  });

  test("1 retry => fail (maxRetry = 0)", async () => {
    const f = jest.fn();
    let count = 0;
    const mock = jest.fn(async () => {
      if (count > 0) {
        return true;
      }
      count++;
      throw new Error("error");
    });
    try {
      await retryWithExponentialBackoff(mock, 0);
    } catch (e) {
      expect(e.message).toBe("error");
      f();
    }
    expect(mock).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenCalledTimes(1);
  });

  test("3 retry => success (maxRetry = 3)", async () => {
    let count = 0;
    const mock = jest.fn(async () => {
      if (count > 2) {
        return true;
      }
      count++;
      throw new Error("error");
    });
    const value = await retryWithExponentialBackoff(mock, 3);
    expect(value).toBe(true);
    expect(mock).toHaveBeenCalledTimes(4);
  });

  test("3 retry => fail (maxRetry = 2)", async () => {
    const f = jest.fn();
    let count = 0;
    const mock = jest.fn(async () => {
      if (count > 2) {
        return true;
      }
      count++;
      throw new Error("error");
    });
    try {
      await retryWithExponentialBackoff(mock, 2);
    } catch (e) {
      expect(e.message).toBe("error");
      f();
    }
    expect(mock).toHaveBeenCalledTimes(3);
    expect(f).toHaveBeenCalledTimes(1);
  });
});
