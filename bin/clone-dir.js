const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");
const ProgressBar = require("progress");

function cloneRepository(repoUrl) {
  let repoName, branch, subDir;

  if (repoUrl.includes("/tree/")) {
    const urlParts = repoUrl.split("/tree/");
    repoName = path.basename(urlParts[0], ".git");
    const branchAndPath = urlParts[1].split("/");
    branch = branchAndPath.shift();
    subDir = branchAndPath.join("/");

    console.log(chalk.green(`🔍 Detected repository: ${repoName}, branch: ${branch}, subdirectory: ${subDir}`));
  } else {
    repoName = path.basename(repoUrl, ".git");
    branch = "master";
    subDir = null;
    console.log(chalk.green(`🔍 Detected repository: ${repoName}, branch: ${branch}`));
  }

  const repoDir = path.resolve(process.cwd(), repoName);

  function showProgressBar(text, total) {
    return new Promise((resolve, reject) => {
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



  if (subDir) {
    (async () => {
      try {
        console.log(chalk.green(`🔍 Cloning the subdirectory: ${subDir} from branch: ${branch}`));
        console.log("Cloning subdirectory... Please wait.");

        fs.mkdirSync(repoDir);
        process.chdir(repoDir);

        execSync(`git init`, { stdio: 'ignore' });
        execSync(`git remote add -f origin ${repoUrl.split('/tree/')[0]}.git`, { stdio: 'ignore' });
        execSync(`git config core.sparseCheckout true`, { stdio: 'ignore' });
        fs.writeFileSync(".git/info/sparse-checkout", `${subDir}/\n`);
        execSync(`git pull origin ${branch}`, { stdio: 'ignore' });  

        await showProgressBar("Moving files and cleaning up...", 100);

        const subDirPath = path.join(repoDir, subDir);
        const files = fs.readdirSync(subDirPath);

        files.forEach(file => {
          const srcPath = path.join(subDirPath, file);
          const destPath = path.join(repoDir, file);
          fs.moveSync(srcPath, destPath, { overwrite: true });
        });

        fs.removeSync(subDirPath);

        if (fs.readdirSync(repoDir).length === 0) {
          const parentDir = path.resolve(process.cwd());
          fs.moveSync(repoDir, path.join(parentDir, subDir), { overwrite: true });
        }

        console.log(chalk.green("Subdirectory cloned successfully."));
      } catch (error) {
        console.error(chalk.red("Failed to clone subdirectory."), error.message);
      }
    })();
  } else {
    (async () => {
      try {
        console.log(chalk.green(`🔍 Cloning the full repository: ${repoUrl.split('/tree/')[0]}`));

        await showProgressBar("Cloning repository...", 100);

        execSync(`git clone --depth=1 ${repoUrl.split('/tree/')[0]}.git`, { stdio: "inherit" });

        console.log(chalk.green("Repository cloned successfully."));
      } catch (error) {
        console.error(chalk.red("Failed to clone repository."), error.message);
      }
    })();
  }
}



module.exports = cloneRepository;
