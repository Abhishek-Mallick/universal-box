const fs = require("fs");
var exec = require("child_process").exec;
const chalk = require("chalk");

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
};
