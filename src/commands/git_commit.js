import header from "../components/header.js";
import commit_types from "../helpers/commit_types.js";
import inquirer from "inquirer";
import clear from "clear";
import chalk from "chalk";
import executionCommand from "../helpers/execution_command.js";
import commitsTypes from "../helpers/commit_types.js";

export default function commit() {
  let commitChoices = [];

  for (const commitType of commitsTypes) {
    const choice = {
      name: `${commitType.name}: ${commitType.description}`,
      value: commitType.name,
      short: commitType.description,
    };
    commitChoices.push(choice);
  }
  clear();
  header();
  console.log(
    chalk.greenBright(
      "Vas a crear un commit con los cambios actuales, por favor selecciona que tipo de commit vas a realizar antes de iniciar\n"
    )
  );

  let message = "";
  let description = "";
  inquirer
    .prompt([
      {
        type: "list",
        name: "commit_type",
        message: "Selecciona el tipo de commit",
        choices: commitChoices,
        pageSize: 6,
        loop: false,
      },
      {
        name: "commit_component",
        message: "Escribe el nombre del componente:",
        validate: async (input) => {
          if (input.length > 4 && input.length < 21) {
            return true;
          } else {
            return "El nombre del componente debe contener entre 5 y 20 caracteres";
          }
        },
        filter: async (input) => {
          return input.replace(/ /g, "_").toLowerCase();
        },
      },
      {
        name: "commit_title",
        message: "Escribe el titulo del commit:",
        validate: async (input) => {
          if (input.length > 4 && input.length < 41) {
            return true;
          } else {
            return "La descripción del commit debe contener entre 5 y 41 caracteres";
          }
        },
      },
      {
        name: "commit_description",
        message: "Escribe la descripción del commit:",
      },
      {
        type: "list",
        name: "commit_confirm",
        message: "Estas seguro de crear el commit ?",
        choices: ["Si", "No"],
      },
    ])
    .then((answers) => {
      message = `${answers.commit_type}(${answers.commit_component}): ${answers.commit_title}`;
      description = answers.commit_description;

      if (answers.commit_confirm == "No") {
        return;
      }

      executionCommand(
        `git add -A && git commit -a -m "${message}" -m "${description}"`
      );
    });
}
