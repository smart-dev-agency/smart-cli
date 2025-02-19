import chalk from "chalk";
import clear from "clear";
import inquirer from "inquirer";
import header from "../components/header.js";
import commitsTypes from "../helpers/commit_types.js";
import config from "../helpers/config.js";
import executionCommand from "../helpers/execution_command.js";

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
    chalk.greenBright("Vas a crear un commit con los cambios actuales, por favor selecciona que tipo de commit vas a realizar antes de iniciar\n")
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
          if (input.length > 2 && input.length < 100) {
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
          if (input.length > 2 && input.length < 100) {
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
        type: "confirm",
        name: "breaking_change",
        message: "¿Es un breaking change?",
        default: false,
      },
      {
        type: "list",
        name: "includeChanges",
        message: "¿Quieres incluir solo los cambios staged o todos los cambios?",
        choices: [
          { name: "Solo staged", value: "staged" },
          { name: "Todos (incluye unstaged)", value: "all" },
        ],
      },
      {
        type: "list",
        name: "commit_confirm",
        message: "¿Estás seguro de crear el commit?",
        choices: ["Si", "No"],
      },
    ])
    .then((answers) => {
      const prefix = config.get("commits_prefix")[answers.commit_type];
      message = `${prefix} ${answers.commit_type}(${answers.commit_component}): ${answers.commit_title}`;
      description = answers.commit_description;

      if (answers.breaking_change) {
        description = "BREAKING CHANGE: " + description;
      }

      if (answers.commit_confirm === "No") {
        return;
      }

      if (answers.includeChanges === "all") {
        executionCommand(`git add -A && git commit -a -m "${message}" -m "${description}"`);
      } else {
        executionCommand(`git commit -m "${message}" -m "${description}"`);
      }
    });
}
