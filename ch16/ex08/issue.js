import * as util from "node:util";
import * as https from "https";

async function listIssues(owner, repository, verbose) {
  try {
    const result = await new Promise((resolve, reject) => {
      const requestOptions = {
        method: "GET",
        host: "api.github.com",
        path: `/repos/${owner}/${repository}/issues`,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "test-issue-app",
        },
      };

      if (verbose) {
        console.log("GET with options", requestOptions);
      }

      https
        .get(requestOptions, (response) => {
          if (verbose) {
            console.log("Response status code", response.statusCode);
            console.log("Response headers", response.headers);
          }
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(new Error(`HTTP status ${response.statusCode}`));
            response.resume();
            return;
          }
          let data = "";
          response.setEncoding("utf8");
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            resolve(data);
          });
        })
        .on("error", (e) => {
          reject(e);
        });
    });
    const issues = JSON.parse(result);
    issues.forEach((element) => {
      if (element.state === "open") {
        console.log(`title: ${element.title}`);
        console.log(`id: ${element.id}\n`);
      }
    });
  } catch (e) {
    console.log(e.message);
  }
}

async function openIssue(owner, repository, title, verbose) {
  try {
    const result = await new Promise((resolve, reject) => {
      const requestOptions = {
        method: "POST",
        host: "api.github.com",
        path: `/repos/${owner}/${repository}/issues`,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "test-issue-app",
        },
      };

      if (verbose) {
        console.log("POST with options", requestOptions);
      }

      const request = https.request(requestOptions);
      request.write(JSON.stringify({ title }));
      request.end();

      request.on("response", (response) => {
        if (verbose) {
          console.log("Response status code", response.statusCode);
          console.log("Response headers", response.headers);
        }
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`HTTP status ${response.statusCode}`));
          response.resume();
          return;
        }
        response.setEncoding("utf8");
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          resolve(data);
        });
      });
      request.on("error", (e) => reject(e));
    });
    console.log("create an issue.", JSON.parse(result).url);
  } catch (e) {
    console.log(e.message);
  }
}

async function closeIssue(owner, repository, issueNo, verbose) {
  try {
    const result = await new Promise((resolve, reject) => {
      const requestOptions = {
        method: "PATCH",
        host: "api.github.com",
        path: `/repos/${owner}/${repository}/issues/${issueNo}`,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "test-issue-app",
        },
      };

      if (verbose) {
        console.log("POST with options", requestOptions);
      }

      const request = https.request(requestOptions);
      request.write(JSON.stringify({ state: "close" }));
      request.end();

      request.on("response", (response) => {
        if (verbose) {
          console.log("Response status code", response.statusCode);
          console.log("Response headers", response.headers);
        }
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`HTTP status ${response.statusCode}`));
          response.resume();
          return;
        }
        response.setEncoding("utf8");
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          resolve(data);
        });
      });
      request.on("error", (e) => reject(e));
    });
    console.log("close an issue.", JSON.parse(result).url);
  } catch (e) {
    console.log(e.message);
  }
}

function main() {
  const options = {
    help: {
      type: "boolean",
      short: "h",
    },
    verbose: {
      type: "boolean",
      short: "v",
    },
    owner: {
      type: "string",
    },
    repository: {
      type: "string",
    },
    title: {
      type: "string",
    },
    issueNo: {
      type: "string",
    },
  };

  if (
    process.argv[2] !== "list" &&
    process.argv[2] !== "open" &&
    process.argv[2] !== "close"
  ) {
    console.log("Please input operation ('list' or 'open' or 'close').");
    return;
  }
  const operation = process.argv[2];

  let owner = undefined;
  let repository = undefined;
  let help = false;
  let verbose = false;
  let title = undefined;
  let issueNo = undefined;
  try {
    const parsedArgs = util.parseArgs({ options, args: process.argv.slice(3) });
    owner = parsedArgs.values.owner;
    repository = parsedArgs.values.repository;
    help = parsedArgs.values.help;
    verbose = parsedArgs.values.verbose;
    title = parsedArgs.values.title;
    issueNo = parsedArgs.values.issueNo;
  } catch (e) {
    console.log(e.message);
    return;
  }

  if (help) {
    console.log(
      "Note: The access token must be set in the $GITHUB_TOKEN environment variable."
    );
    console.log("USAGE: node issue.js [command] [options]");
    console.log("command: Select 'list' or 'open' or 'close'.");
    console.log("         list ... List all issues.");
    console.log("         open ... Open an issue.");
    console.log("         close ... Close an issue.");
    console.log("options:");
    console.log("         --help | -h ... Show help.");
    console.log("         --verbose | -v ... Show detailed logs.");
    console.log("         --owner ... Specify a owner of repository.");
    console.log("              Required for list, open, close command.");
    console.log("         --repository ... Specify a name of repository.");
    console.log("              Required for list, open, close command.");
    console.log("         --title ... Specify a name of issue.");
    console.log("              Required for open command.");
    console.log("         --issueNo ... Specify id of issue.");
    console.log("              Required for close command.");
    return;
  }

  if (process.env.GITHUB_TOKEN === undefined) {
    console.log("Please set $GITHUB_TOKEN");
    return;
  }

  if (owner === undefined || repository === undefined) {
    console.log("Please input owner and repository.");
    return;
  }

  if (operation === "list") {
    listIssues(owner, repository, verbose);
    return;
  }

  if (operation === "open") {
    if (title === undefined) {
      console.log("Please input title.");
      return;
    }
    openIssue(owner, repository, title, verbose);
    return;
  }

  if (operation === "close") {
    if (issueNo === undefined) {
      console.log("Please input issueNo.");
      return;
    }
    closeIssue(owner, repository, issueNo, verbose);
    return;
  }
}

main();
