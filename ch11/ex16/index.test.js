import { retryWithExponentialBackoff } from "./index.js";

describe("retryWithExponentialBackoff", () => {
  test("func = () => true, maxRetry = 0", async () => {
    const mock = jest.fn();
    const result = await new Promise((resolve) => {
      retryWithExponentialBackoff(
        () => {
          mock();
          return true;
        },
        0,
        (result) => {
          resolve(result);
        }
      );
    });
    expect(result).toBe(true);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test("func = () => [false, true], maxRetry = 0", async () => {
    const mock = jest.fn();
    const result = await new Promise((resolve) => {
      let index = 0;
      const result = [false, true];
      retryWithExponentialBackoff(
        () => {
          mock();
          return result[index++];
        },
        0,
        (result) => {
          resolve(result);
        }
      );
    });
    expect(result).toBe(false);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  test("func = () => [false, true], maxRetry = 1", async () => {
    const mock = jest.fn();
    const result = await new Promise((resolve) => {
      let index = 0;
      const result = [false, true];
      retryWithExponentialBackoff(
        () => {
          mock();
          return result[index++];
        },
        1,
        (result) => {
          resolve(result);
        }
      );
    });
    expect(result).toBe(true);
    expect(mock).toHaveBeenCalledTimes(2);
  });

  test("func = () => [false, false, true], maxRetry = 1", async () => {
    const mock = jest.fn();
    const result = await new Promise((resolve) => {
      let index = 0;
      const result = [false, false, true];
      retryWithExponentialBackoff(
        () => {
          mock();
          return result[index++];
        },
        1,
        (result) => {
          resolve(result);
        }
      );
    });
    expect(result).toBe(false);
    expect(mock).toHaveBeenCalledTimes(2);
  });

  test("func = () => [false, false, true], maxRetry = 2", async () => {
    const mock = jest.fn();
    const result = await new Promise((resolve) => {
      let index = 0;
      const result = [false, false, true];
      retryWithExponentialBackoff(
        () => {
          mock();
          return result[index++];
        },
        2,
        (result) => {
          resolve(result);
        }
      );
    });
    expect(result).toBe(true);
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
