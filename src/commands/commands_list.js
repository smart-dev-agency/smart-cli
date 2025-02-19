import chalk from "chalk";
import clear from "clear";
import header from "../components/header.js";
import availableCommands from "../helpers/available_commands.js";

export default function commandList() {
  clear();
  header();
  console.log(
    chalk.whiteBright(
      'Estos son los comandos disponibles en el CLI, para ejecutar un comando debes anteponer "smart-cli" ejemplo: "smart-cli commit" \n'
    )
  );
  availableCommands.forEach((command) =>
    console.log(
      chalk.greenBright(`${command.name}:`) + chalk.white(` ${command.description}`)
    )
  );
}
