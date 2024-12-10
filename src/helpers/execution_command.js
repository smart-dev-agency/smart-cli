import { exec } from "child_process";
import chalk from "chalk";

export default function executionCommand(command) {
  return new Promise(function (resolve, reject) {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(chalk.redBright(`error: ${error}`));
        reject(error);
      } else if (stderr) {
        console.log(chalk.blueBright(stderr));
        resolve(stderr);
      } else {
        console.log(chalk.greenBright(stdout));
        resolve(stdout);
      }
    }).stdout.pipe(process.stdout);
  });
}
