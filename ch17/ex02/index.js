import * as https from 'https';

export async function listIssues(owner, repository, verbose) {
  try {
    const result = await new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'GET',
        host: 'api.github.com',
        path: `/repos/${owner}/${repository}/issues`,
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'test-issue-app',
        },
      };

      if (verbose) {
        console.log('GET with options', requestOptions);
      }

      https
        .get(requestOptions, response => {
          if (verbose) {
            console.log('Response status code', response.statusCode);
            console.log('Response headers', response.headers);
          }
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(new Error(`HTTP status ${response.statusCode}`));
            response.resume();
            return;
          }
          let data = '';
          response.setEncoding('utf8');
          response.on('data', chunk => {
            data += chunk;
          });
          response.on('end', () => {
            resolve(data);
          });
        })
        .on('error', e => {
          reject(e);
        });
    });
    const issues = JSON.parse(result);
    issues.forEach(element => {
      if (element.state === 'open') {
        console.log(`title: ${element.title}`);
        console.log(`id: ${element.id}\n`);
      }
    });
  } catch (e) {
    console.log(e.message);
  }
}

export async function openIssue(owner, repository, title, verbose) {
  try {
    const result = await new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'POST',
        host: 'api.github.com',
        path: `/repos/${owner}/${repository}/issues`,
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'test-issue-app',
        },
      };

      if (verbose) {
        console.log('POST with options', requestOptions);
      }

      const request = https.request(requestOptions);
      request.write(JSON.stringify({title}));
      request.end();

      request.on('response', response => {
        if (verbose) {
          console.log('Response status code', response.statusCode);
          console.log('Response headers', response.headers);
        }
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`HTTP status ${response.statusCode}`));
          response.resume();
          return;
        }
        response.setEncoding('utf8');
        let data = '';
        response.on('data', chunk => {
          data += chunk;
        });
        response.on('end', () => {
          resolve(data);
        });
      });
      request.on('error', e => reject(e));
    });
    console.log('create an issue.', JSON.parse(result).url);
  } catch (e) {
    console.log(e.message);
  }
}

export async function closeIssue(owner, repository, issueNo, verbose) {
  try {
    const result = await new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'PATCH',
        host: 'api.github.com',
        path: `/repos/${owner}/${repository}/issues/${issueNo}`,
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'test-issue-app',
        },
      };

      if (verbose) {
        console.log('POST with options', requestOptions);
      }

      const request = https.request(requestOptions);
      request.write(JSON.stringify({state: 'close'}));
      request.end();

      request.on('response', response => {
        if (verbose) {
          console.log('Response status code', response.statusCode);
          console.log('Response headers', response.headers);
        }
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`HTTP status ${response.statusCode}`));
          response.resume();
          return;
        }
        response.setEncoding('utf8');
        let data = '';
        response.on('data', chunk => {
          data += chunk;
        });
        response.on('end', () => {
          resolve(data);
        });
      });
      request.on('error', e => reject(e));
    });
    console.log('close an issue.', JSON.parse(result).url);
  } catch (e) {
    console.log(e.message);
  }
}
