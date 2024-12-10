import clear from "clear";
import chalk from "chalk";
import header from "../components/header.js";

function greeting() {
  clear();
  header();
  console.log(chalk.blueBright("Herramientas CLI Smart Dev"));
  console.log(
    chalk.greenBright(
      'Para ver una lista de los comandos disponibles por favor ejecuta el comando "smart-cli list"'
    )
  );
}

export { greeting };
