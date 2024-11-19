import {listIssues, openIssue, closeIssue} from './index.js';
import {Polly} from '@pollyjs/core';
import * as NodeHttpAdapter from '@pollyjs/adapter-node-http';
import * as FsPersister from '@pollyjs/persister-fs';

Polly.register(NodeHttpAdapter);
Polly.register(FsPersister);

// 初回実行時は実際にあるrepo nameを指定する
const repositoryName = process.env.REPO_NAME;
// 初回実行時は実際にあるissue noを指定する
const closeIssueNo = 7;

describe('listIssues', () => {
  test('GET', async () => {
    const polly = new Polly('listIssues', {
      adapters: ['node-http'],
      persister: 'fs',
      mode: 'replay',
      persisterOptions: {
        fs: {
          recordingsDir: './recordings',
        },
      },
      matchRequestsBy: {
        method: true,
        url: true,
        headers: false,
        body: true,
      },
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await listIssues('ywatanabe-dev', repositoryName, true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'GET with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'GET',
      path: `/repos/ywatanabe-dev/${repositoryName}/issues`,
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      200
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      3,
      'Response headers',
      expect.objectContaining({
        'content-type': 'application/json; charset=utf-8',
      })
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      4,
      expect.stringMatching(/^title: .+$/)
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      5,
      expect.stringMatching(/^id: \d+\n$/)
    );
    consoleLogSpy.mockRestore();
    await polly.stop();
  });

  test('GET error', async () => {
    const polly = new Polly('listIssues-error', {
      adapters: ['node-http'],
      persister: 'fs',
      mode: 'replay',
      persisterOptions: {
        fs: {
          recordingsDir: './recordings',
        },
      },
      matchRequestsBy: {
        method: true,
        url: true,
        headers: false,
        body: true,
      },
      recordFailedRequests: true,
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await listIssues('ywatanabe-dev', 'not-exist-repository', true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'GET with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'GET',
      path: '/repos/ywatanabe-dev/not-exist-repository/issues',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      404
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      3,
      'Response headers',
      expect.objectContaining({
        'content-type': 'application/json; charset=utf-8',
      })
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, 'HTTP status 404');
    consoleLogSpy.mockRestore();
    await polly.stop();
  });
});

describe('openIssue', () => {
  test('REQUEST', async () => {
    const polly = new Polly('openIssue', {
      adapters: ['node-http'],
      persister: 'fs',
      mode: 'replay',
      persisterOptions: {
        fs: {
          recordingsDir: './recordings',
        },
      },
      matchRequestsBy: {
        method: true,
        url: true,
        headers: false,
        body: true,
      },
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await openIssue('ywatanabe-dev', repositoryName, 'sample', true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'POST with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'POST',
      path: `/repos/ywatanabe-dev/${repositoryName}/issues`,
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      201
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      3,
      'Response headers',
      expect.objectContaining({
        'content-type': 'application/json; charset=utf-8',
      })
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      4,
      'create an issue.',
      expect.stringMatching(
        new RegExp(
          `^https://api.github.com/repos/ywatanabe-dev/${repositoryName}/issues/\\d+$`
        )
      )
    );
    consoleLogSpy.mockRestore();
    await polly.stop();
  });

  test('REQUEST error', async () => {
    const polly = new Polly('openIssue-error', {
      adapters: ['node-http'],
      persister: 'fs',
      mode: 'replay',
      persisterOptions: {
        fs: {
          recordingsDir: './recordings',
        },
      },
      matchRequestsBy: {
        method: true,
        url: true,
        headers: false,
        body: true,
      },
      recordFailedRequests: true,
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await openIssue('ywatanabe-dev', 'not-exist-repository', 'sample', true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'POST with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'POST',
      path: '/repos/ywatanabe-dev/not-exist-repository/issues',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      404
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      3,
      'Response headers',
      expect.objectContaining({
        'content-type': 'application/json; charset=utf-8',
      })
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, 'HTTP status 404');
    consoleLogSpy.mockRestore();
    await polly.stop();
  });
});

describe('closeIssue', () => {
  test('REQUEST', async () => {
    const polly = new Polly('closeIssue', {
      adapters: ['node-http'],
      persister: 'fs',
      mode: 'replay',
      persisterOptions: {
        fs: {
          recordingsDir: './recordings',
        },
      },
      matchRequestsBy: {
        method: true,
        url: true,
        headers: false,
        body: true,
      },
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await closeIssue('ywatanabe-dev', repositoryName, closeIssueNo, true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'POST with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'PATCH',
      path: `/repos/ywatanabe-dev/${repositoryName}/issues/${closeIssueNo}`,
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      200
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      3,
      'Response headers',
      expect.objectContaining({
        'content-type': 'application/json; charset=utf-8',
      })
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      4,
      'close an issue.',
      expect.stringMatching(
        new RegExp(
          `^https://api.github.com/repos/ywatanabe-dev/${repositoryName}/issues/\\d+$`
        )
      )
    );
    consoleLogSpy.mockRestore();
    await polly.stop();
  });

  test('REQUEST error', async () => {
    const polly = new Polly('closeIssue-error', {
      adapters: ['node-http'],
      persister: 'fs',
      mode: 'replay',
      persisterOptions: {
        fs: {
          recordingsDir: './recordings',
        },
      },
      matchRequestsBy: {
        method: true,
        url: true,
        headers: false,
        body: true,
      },
      recordFailedRequests: true,
    });
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    await closeIssue('ywatanabe-dev', 'not-exist-repository', 0, true);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'POST with options', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'test-issue-app',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'PATCH',
      path: '/repos/ywatanabe-dev/not-exist-repository/issues/0',
    });
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      'Response status code',
      404
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      3,
      'Response headers',
      expect.objectContaining({
        'content-type': 'application/json; charset=utf-8',
      })
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, 'HTTP status 404');
    consoleLogSpy.mockRestore();
    await polly.stop();
  });
});
