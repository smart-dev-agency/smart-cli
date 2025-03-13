import chalk from "chalk";
import clear from "clear";
import inquirer from "inquirer";
import header from "../components/header.js";
import availableCommands from "../helpers/available_commands.js";
import checkUpdate from "../helpers/check_update.js";
import commandList from "./commands_list.js";
import commit from "./git_commit.js";
import newBranch from "./new_branch.js";
import testCoverage from "./test_coverage.js";
import updateConfig from "./update_config.js";

async function greeting() {
  clear();
  header();
  console.log(chalk.greenBright("Herramientas CLI Smart Dev \n"));
  await checkUpdate();

  let commandChoices = [];
  for (const command of availableCommands) {
    const option = {
      name: `${command.name}`,
      value: command.name,
      short: command.description,
    };
    commandChoices.push(option);
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "command",
        message: "Selecciona el comando que deseas ejecutar",
        choices: commandChoices,
        pageSize: 6,
        loop: false,
      },
    ])
    .then((answers) => {
      switch (answers.command) {
        case "commit":
          commit();
          break;
        case "new_branch":
          newBranch();
          break;
        // case "use_template":
        //   useTemplate();
          break;
        case "test_coverage":
          testCoverage();
          break;
        case "list":
          commandList();
          break;
        case "update_config":
          updateConfig();
          break;
        default:
          commandList();
          break;
      }
    });
}

export { greeting };
