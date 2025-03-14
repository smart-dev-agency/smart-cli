import chalk from "chalk";
import inquirer from "inquirer";
import latestVersion from "latest-version";
import semver from "semver";
import pkg from "../../package.json" assert { type: "json" };
import executionCommand from "./execution_command.js";

export default async function checkUpdate() {
  const currentVersion = pkg.version;
  const latest = await latestVersion(pkg.name);
  if (semver.gt(latest, currentVersion)) {
    console.log(chalk.greenBright(`Actualización disponible: v${latest}`));
    const { update } = await inquirer.prompt([
      {
        type: "confirm",
        name: "update",
        message: "¿Deseas actualizar?",
        default: true,
      },
    ]);
    if (update) {
      await executionCommand(`npm install -g ${pkg.name}`);
      console.log(chalk.greenBright("Actualización realizada con éxito\n"));
    }
  }
}
