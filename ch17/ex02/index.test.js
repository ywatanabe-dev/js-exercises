import {listIssues, openIssue, closeIssue} from './index.js';
import * as https from 'https';
import * as EventEmitter from 'events';

jest.mock('https');
process.env.GITHUB_TOKEN = 'test';

describe('listIssues', () => {
  test('GET', async () => {
    const mockResponse = new EventEmitter();
    mockResponse.statusCode = 200;
    mockResponse.headers = {'content-type': 'application/json'};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockResponse.setEncoding = encoding => {};

    process.nextTick(() => {
      mockResponse.emit(
        'data',
        JSON.stringify([{title: 'test_title', id: 12345, state: 'open'}])
      );
      mockResponse.emit('end');
    });

    https.get.mockImplementation((url, callback) => {
      callback(mockResponse);
      return mockResponse;
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await listIssues('owner', 'repository', false);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'title: test_title');
    expect(consoleLogSpy).toHaveBeenNthCalledWith(2, 'id: 12345\n');
    consoleLogSpy.mockRestore();
  });

  test('GET', async () => {
    const mockResponse = new EventEmitter();
    mockResponse.statusCode = 200;
    mockResponse.headers = {'content-type': 'application/json'};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockResponse.setEncoding = encoding => {};

    process.nextTick(() => {
      mockResponse.emit(
        'data',
        JSON.stringify([{title: 'test_title', id: 12345, state: 'open'}])
      );
      mockResponse.emit('end');
    });

    https.get.mockImplementation((url, callback) => {
      callback(mockResponse);
      return mockResponse;
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await listIssues('owner', 'repository', true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'GET with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer test',
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'GET',
      path: '/repos/owner/repository/issues',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      200
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, 'Response headers', {
      'content-type': 'application/json',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, 'title: test_title');
    expect(consoleLogSpy).toHaveBeenNthCalledWith(5, 'id: 12345\n');
    consoleLogSpy.mockRestore();
  });

  test('GET error', async () => {
    const mockResponse = new EventEmitter();
    mockResponse.statusCode = 400;
    mockResponse.headers = {'content-type': 'application/json'};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockResponse.setEncoding = encoding => {};

    process.nextTick(() => {
      mockResponse.emit(
        'data',
        JSON.stringify([{title: 'test_title', id: 12345, state: 'open'}])
      );
      mockResponse.emit('end');
    });

    https.get.mockImplementation((url, callback) => {
      callback(mockResponse);
      return mockResponse;
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await listIssues('owner', 'repository', true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'GET with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer test',
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'GET',
      path: '/repos/owner/repository/issues',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      400
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, 'Response headers', {
      'content-type': 'application/json',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, 'HTTP status 400');
    consoleLogSpy.mockRestore();
  });
});

describe('openIssue', () => {
  test('REQUEST', async () => {
    const mockResponse = new EventEmitter();
    mockResponse.statusCode = 200;
    mockResponse.headers = {'content-type': 'application/json'};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockResponse.setEncoding = encoding => {};

    process.nextTick(() => {
      mockResponse.emit('data', JSON.stringify({url: 'https://example.com'}));
      mockResponse.emit('end');
    });

    const mockRequest = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      write: input => {},
      end: () => {},
      on: (method, callback) => {
        if (method === 'response') {
          callback(mockResponse);
        }
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    https.request.mockImplementation(option => {
      return mockRequest;
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await openIssue('owner', 'repository', 'title', false);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      1,
      'create an issue.',
      'https://example.com'
    );
    consoleLogSpy.mockRestore();
  });

  test('REQUEST', async () => {
    const mockResponse = new EventEmitter();
    mockResponse.statusCode = 200;
    mockResponse.headers = {'content-type': 'application/json'};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockResponse.setEncoding = encoding => {};

    process.nextTick(() => {
      mockResponse.emit('data', JSON.stringify({url: 'https://example.com'}));
      mockResponse.emit('end');
    });

    const mockRequest = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      write: input => {},
      end: () => {},
      on: (method, callback) => {
        if (method === 'response') {
          callback(mockResponse);
        }
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    https.request.mockImplementation(option => {
      return mockRequest;
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await openIssue('owner', 'repository', 'title', true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'POST with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer test',
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'POST',
      path: '/repos/owner/repository/issues',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      200
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, 'Response headers', {
      'content-type': 'application/json',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      4,
      'create an issue.',
      'https://example.com'
    );
    consoleLogSpy.mockRestore();
  });

  test('REQUEST error', async () => {
    const mockResponse = new EventEmitter();
    mockResponse.statusCode = 400;
    mockResponse.headers = {'content-type': 'application/json'};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockResponse.setEncoding = encoding => {};

    process.nextTick(() => {
      mockResponse.emit('data', JSON.stringify({url: 'https://example.com'}));
      mockResponse.emit('end');
    });

    const mockRequest = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      write: input => {},
      end: () => {},
      on: (method, callback) => {
        if (method === 'response') {
          callback(mockResponse);
        }
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    https.request.mockImplementation(option => {
      return mockRequest;
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await openIssue('owner', 'repository', 'title', true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'POST with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer test',
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'POST',
      path: '/repos/owner/repository/issues',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      400
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, 'Response headers', {
      'content-type': 'application/json',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, 'HTTP status 400');
    consoleLogSpy.mockRestore();
  });
});

describe('closeIssue', () => {
  test('REQUEST', async () => {
    const mockResponse = new EventEmitter();
    mockResponse.statusCode = 200;
    mockResponse.headers = {'content-type': 'application/json'};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockResponse.setEncoding = encoding => {};

    process.nextTick(() => {
      mockResponse.emit('data', JSON.stringify({url: 'https://example.com'}));
      mockResponse.emit('end');
    });

    const mockRequest = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      write: input => {},
      end: () => {},
      on: (method, callback) => {
        if (method === 'response') {
          callback(mockResponse);
        }
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    https.request.mockImplementation(option => {
      return mockRequest;
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await closeIssue('owner', 'repository', 0, false);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      1,
      'close an issue.',
      'https://example.com'
    );
    consoleLogSpy.mockRestore();
  });

  test('REQUEST', async () => {
    const mockResponse = new EventEmitter();
    mockResponse.statusCode = 200;
    mockResponse.headers = {'content-type': 'application/json'};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockResponse.setEncoding = encoding => {};

    process.nextTick(() => {
      mockResponse.emit('data', JSON.stringify({url: 'https://example.com'}));
      mockResponse.emit('end');
    });

    const mockRequest = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      write: input => {},
      end: () => {},
      on: (method, callback) => {
        if (method === 'response') {
          callback(mockResponse);
        }
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    https.request.mockImplementation(option => {
      return mockRequest;
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await closeIssue('owner', 'repository', 0, true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'POST with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer test',
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'PATCH',
      path: '/repos/owner/repository/issues/0',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      200
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, 'Response headers', {
      'content-type': 'application/json',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      4,
      'close an issue.',
      'https://example.com'
    );
    consoleLogSpy.mockRestore();
  });

  test('REQUEST error', async () => {
    const mockResponse = new EventEmitter();
    mockResponse.statusCode = 400;
    mockResponse.headers = {'content-type': 'application/json'};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockResponse.setEncoding = encoding => {};

    process.nextTick(() => {
      mockResponse.emit('data', JSON.stringify({url: 'https://example.com'}));
      mockResponse.emit('end');
    });

    const mockRequest = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      write: input => {},
      end: () => {},
      on: (method, callback) => {
        if (method === 'response') {
          callback(mockResponse);
        }
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    https.request.mockImplementation(option => {
      return mockRequest;
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await closeIssue('owner', 'repository', 0, true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'POST with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer test',
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'PATCH',
      path: '/repos/owner/repository/issues/0',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      400
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, 'Response headers', {
      'content-type': 'application/json',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, 'HTTP status 400');
    consoleLogSpy.mockRestore();
  });
});
