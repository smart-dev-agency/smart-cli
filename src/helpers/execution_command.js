import chalk from "chalk";
import { exec } from "child_process";

export default function executionCommand(command, showError = true, showStderr = true, showStdout = true) {
  return new Promise(function (resolve, reject) {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        if (showError) {
          console.log(chalk.redBright(`error: ${error}`));
        }
        reject(error);
      } else if (stderr) {
        if (showStderr) {
          console.log(chalk.blueBright(stderr));
        }
        resolve(stderr);
      } else {
        if (showStdout) {
          console.log(chalk.greenBright(stdout));
        }
        resolve(stdout);
      }
    });
  });
}
