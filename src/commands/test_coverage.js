import header from "../components/header.js";
import inquirer from "inquirer";
import clear from "clear";
import chalk from "chalk";
import executionCommand from "../helpers/execution_command.js";

export default async function testCoverage() {
  clear();
  header();
  console.log(
    chalk.whiteBright("Ejecuta un test coverage sobre un repositorio.\n")
  );

  console.log(
    chalk.greenBright("Asegúrese de tener instalado lcov antes de iniciar.\n")
  );

  inquirer
    .prompt([
      {
        type: "list",
        name: "test_coverage_confirm",
        message: "Estas seguro de ejecutar un test coverage ?",
        choices: ["Si", "No"],
      },
    ])
    .then(async (answers) => {
      if (answers.test_coverage_confirm == "No") {
        return;
      }
      try {
        await executionCommand(`flutter test --coverage`);
        await executionCommand(`genhtml coverage/lcov.info -o coverage/html`);
        await executionCommand(`open coverage/html/index.html`);
      } catch (error) {
        console.log(chalk.redBright(error));
      }
    });
}
