import chalk from "chalk";
import clear from "clear";
import fs from "fs-extra";
import inquirer from "inquirer";
import header from "../components/header.js";
import availableTemplates from "../helpers/available_templates.js";
import getAppDirectory from "../helpers/get_app_directory.js";

const currentDirectory = `${process.cwd()}/`;

export default async function useTemplate() {
  let templatesChoices = [];

  for (const template of availableTemplates) {
    const choice = {
      name: `${template.name}: ${template.description}`,
      value: template.name,
      short: template.description,
    };
    templatesChoices.push(choice);
  }

  clear();
  header();
  console.log(
    chalk.whiteBright(
      "Crea un template para una nueva funcionalidad de Flutter con toda la estructura de directorios y el código fuente inicial.\n"
    )
  );

  console.log(
    chalk.greenBright("El template se creará en el directorio actual.\n")
  );

  inquirer
    .prompt([
      {
        type: "list",
        name: "template_name",
        message: "Selecciona el template que deseas usar",
        choices: templatesChoices,
      },
      {
        name: "component_name",
        message: "Escribe el nombre del nuevo componente:",
        validate: async (input) => {
          if (!(input.length > 4 && input.length < 41)) {
            return "El nombre del componente debe contener entre 5 y 40 caracteres";
          }
          return true;
        },
        filter: async (input) => {
          return input.replace(/ /g, "_").toLowerCase();
        },
      },
      {
        type: "list",
        name: "template_confirm",
        message: "Estas seguro de crear el template ?",
        choices: ["Si", "No"],
      },
    ])
    .then(async (answers) => {
      const destinationDirectory = `${currentDirectory}/${answers.component_name}`;
      const templateDirectory = `${getAppDirectory}/templates/${answers.template_name}`;

      if (answers.template_confirm == "No") {
        return;
      }

      try {
        fs.copy(templateDirectory, destinationDirectory, {
          overwrite: true,
        });
        console.log(chalk.greenBright("Componente creado con éxito"));
      } catch (err) {
        console.log(chalk.redBright(err));
      }
    });
}
