const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");
const ProgressBar = require("progress");

function cloneRepository(repoUrl, projectName) {
  return new Promise((resolve, reject) => {
    let branch, subDir;

    if (repoUrl.includes("/tree/")) {
      const urlParts = repoUrl.split("/tree/");
      const repoName = path.basename(urlParts[0], ".git");
      const branchAndPath = urlParts[1].split("/");
      branch = branchAndPath.shift();
      subDir = decodeURIComponent(branchAndPath.join("/"));
      console.log(chalk.green(`🔍 Detected repository: ${repoName}, branch: ${branch}, subdirectory: ${subDir}`));
    } else {
      branch = "master";
      subDir = null; // No subdirectory specified
      console.log(chalk.green(`🔍 Detected repository: ${repoUrl.split('/')[2]}, branch: ${branch}`));
    }

    const repoDir = path.resolve(process.cwd(), projectName);

    function showProgressBar(text, total) {
      return new Promise((resolve) => {
        console.log(text);
        const bar = new ProgressBar(`[:bar] :percent :etas`, {
          complete: "=",
          incomplete: " ",
          width: 50,
          total: total,
        });

        const timer = setInterval(() => {
          bar.tick(1);
          if (bar.complete) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    }

    (async () => {
      try {
        fs.mkdirSync(repoDir, { recursive: true });
        process.chdir(repoDir);

        if (subDir) {
          execSync(`git init`, { stdio: 'ignore' });
          execSync(`git remote add -f origin ${repoUrl.split('/tree/')[0]}.git`, { stdio: 'ignore' });
          execSync(`git config core.sparseCheckout true`, { stdio: 'ignore' });

          fs.writeFileSync(".git/info/sparse-checkout", `${subDir}/\n`);

          execSync(`git pull origin ${branch}`, { stdio: 'ignore' });

          await showProgressBar("Moving files and cleaning up...", 100);

          const subDirPath = path.join(repoDir, subDir);

          if (!fs.existsSync(subDirPath)) {
            throw new Error(`Subdirectory "${subDir}" does not exist in the repository.`);
          }

          const files = fs.readdirSync(subDirPath);

          for (const file of files) {
            const srcPath = path.join(subDirPath, file);
            const destPath = path.join(repoDir, file);
            
            // Check if the destination already exists
            if (fs.existsSync(destPath)) {
              console.warn(chalk.yellow(`Destination already exists: ${destPath}. Skipping.`));
              continue;
            }

            // Moving file from srcPath to destPath
            fs.moveSync(srcPath, destPath, { overwrite: true });
          }

          // Remove the subdirectory after moving its contents
          fs.removeSync(subDirPath);

          const parentDirPath = path.dirname(subDirPath);

          if (fs.readdirSync(parentDirPath).length === 0) {
            fs.removeSync(parentDirPath);
          }

          const templatesDirPath = path.join(repoDir, "template");
          if (fs.existsSync(templatesDirPath) && fs.readdirSync(templatesDirPath).length === 0) {
            fs.removeSync(templatesDirPath);
          }

          console.log(chalk.green("Desired template imported successfully ✨"));
        } else {
          console.log(chalk.green(`🔍 Cloning entire repository...`));
          execSync(`git clone --depth=1 ${repoUrl} .`, { stdio: "inherit" });
          console.log(chalk.green("Repository cloned successfully."));
        }

        resolve();
      } catch (error) {
        console.error(chalk.red("Failed to clone repository."), error.message);
        reject(error);
      }
    })();
  });
}

module.exports = cloneRepository;