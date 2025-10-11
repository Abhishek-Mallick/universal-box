const fs = require("fs");
var exec = require("child_process").exec;
const chalk = require("chalk");

function isGitHubURLValid(url) {
    if (url.startsWith('git@')) {
      return isValidSSHGitHubURL(url);
    }
    return isValidHTTPSGitHubURL(url);
  }
  
  function isValidSSHGitHubURL(url) {
    const githubDomainPattern = /(^|\.)github\.com$/;
    const sshGithubPattern = /^git@([\w.-]+):([\w.-]+)\/([\w.-]+)(\.git)?$/;
  
    const match = sshGithubPattern.exec(url);
    return !!(match && githubDomainPattern.test(match[1]));
  
  }
  
  function isValidHTTPSGitHubURL(url) {
    const githubDomainPattern = /(^|\.)github\.com$/;
    const githubPathRegex = /^\/[\w.-]+\/[\w.-]+(?:\.git)?\/?$/;
  
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      return false;
    }
  
    if (parsedUrl.protocol !== 'https:') return false;
  
    if (!githubDomainPattern.test(parsedUrl.hostname)) return false;
  
    if (parsedUrl.search || parsedUrl.hash) return false;
  
    if (!githubPathRegex.test(parsedUrl.pathname)) return false;
  
    return true;
  
  }

module.exports = {
  makeFolders: function (array_list) {
    const supportedFolders = ["models", "views", "controllers", "routes"];

    return new Promise((resolve, reject) => {
      array_list.forEach((folder) => {
        if (supportedFolders.includes(folder)) {
          if (!fs.existsSync(`./${folder}`)) {
            fs.mkdirSync(`./${folder}`);
            console.log(chalk.yellow(`Directory Created -> ./${folder}`));
          }
        } else {
          console.log("\x1b[31m", `NO SUPPORT FOR DIRECTORY ./${folder}`);
          reject({
            success: false,
            message: "No support for entered directory!",
          });
        }
      });

      resolve({ success: true, message: "Created folders successfully" });
    });
  },
  isGitHubURLValid,
};
