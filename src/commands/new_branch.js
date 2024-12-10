import header from "../components/header.js";
import inquirer from "inquirer";
import clear from "clear";
import chalk from "chalk";
import Validations from "../helpers/validations.js";
import executionCommand from "../helpers/execution_command.js";

export default function newBranch() {
  clear();
  header();
  console.log(
    chalk.whiteBright(
      "Crea una nueva rama de Git desde la rama actual siguiendo buenas prácticas.\n"
    )
  );

  let branchName = "";
  inquirer
    .prompt([
      {
        name: "hu_code",
        message: "Escribe un identificador de la historia de usuario:",
        validate: async (input) => {
          const validate = new Validations();
          if (!(input.length > 4 && input.length < 16)) {
            return "El código de la HU o Habilitador debe contener entre 5 y 15 caracteres";
          }
          if (!validate.isNumber(input)) {
            return "El código de la HU o Habilitador solo debe contener números";
          }
          return true;
        },
      },
      {
        name: "component_name",
        message: "Escribe el nombre del componente (opcional):",
        validate: async (input) => {
          if (!(input.length > 4 && input.length < 41)) {
            return "El nombre del componente debe contener entre 5 y 40 caracteres";
          }
          return true;
        },
        filter: async (input) => {
          let component_name = "";
          if (!input.length == 0) {
            component_name = `_${input}`;
          }
          return component_name.replace(/ /g, "_").toLowerCase();
        },
      },
      {
        type: "list",
        name: "new_branch_confirm",
        message: "Estas seguro de crear la nueva rama ?",
        choices: ["Si", "No"],
      },
    ])
    .then((answers) => {
      branchName = `feature/${answers.hu_code}${answers.component_name}`;
      if (answers.new_branch_confirm == "No") {
        return;
      }

      executionCommand(`git checkout -b ${branchName}`);
    });
}
