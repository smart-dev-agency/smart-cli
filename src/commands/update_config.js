import chalk from "chalk";
import clear from "clear";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import header from "../components/header.js";
import config from "../helpers/config.js";

export default async function updateConfig() {
  clear();
  header();
  console.log(chalk.greenBright("Actualización de configuración del CLI desde un archivo JSON\n"));

  const currentDir = process.cwd();
  console.log(chalk.blueBright(`Directorio actual: ${currentDir}\n`));
  console.log(chalk.yellowBright("Asegúrate de estar ubicado en el directorio donde se encuentra el archivo de configuración.\n"));

  const { continueConfirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "continueConfirm",
      message: "¿Deseas continuar con el directorio actual?",
      default: true,
    },
  ]);

  if (!continueConfirm) {
    console.log(chalk.redBright("Operación cancelada. Trasládate al directorio correcto y vuelve a ejecutar el comando."));
    return;
  }

  const filesInDir = fs.readdirSync(currentDir);
  const jsonFiles = filesInDir.filter((file) => file.endsWith(".json"));

  let jsonFile;
  if (jsonFiles.length === 0) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "jsonFile",
        message: "No se encontraron archivos JSON en el directorio actual. Ingresa la ruta completa del archivo JSON:",
        validate: (input) => {
          if (fs.existsSync(input) && input.endsWith(".json")) {
            return true;
          } else {
            return "El archivo no existe o no es un JSON. Verifica la ruta.";
          }
        },
      },
    ]);
    jsonFile = answer.jsonFile;
  } else {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "jsonFile",
        message: "Selecciona el archivo JSON con la nueva configuración:",
        choices: jsonFiles,
      },
    ]);

    jsonFile = path.resolve(currentDir, answer.jsonFile);
  }

  let fileContent;
  try {
    fileContent = fs.readFileSync(jsonFile, "utf-8");
  } catch (err) {
    console.error(chalk.redBright("Error al leer el archivo:"), err);
    return;
  }

  let jsonConfig;
  try {
    jsonConfig = JSON.parse(fileContent);
  } catch (err) {
    console.error(chalk.redBright("Error al parsear el JSON:"), err);
    return;
  }

  if (!validateConfig(jsonConfig)) {
    console.error(chalk.redBright("La estructura del JSON no es válida. Asegúrate de que cumpla con la siguiente estructura:"));
    console.log(
      JSON.stringify(
        {
          cli_name: "",
          commits_prefix: {
            feat: "",
            fix: "",
            chore: "",
            release: "",
            docs: "",
            test: "",
            style: "",
            refactor: "",
            perf: "",
            build: "",
            ci: "",
            revert: "",
          },
        },
        null,
        2
      )
    );
    return;
  }

  const { confirmUpdate } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmUpdate",
      message: "¿Estás seguro de actualizar la configuración del CLI con este archivo?",
      default: false,
    },
  ]);

  if (!confirmUpdate) {
    console.log(chalk.yellowBright("Actualización cancelada."));
    return;
  }

  // Guardar la configuración usando la librería conf
  config.set("cli_name", jsonConfig.cli_name);
  config.set("commits_prefix", jsonConfig.commits_prefix);

  console.log(chalk.greenBright("La configuración ha sido actualizada exitosamente."));
  console.log(chalk.redBright(`Las preferencias se han guardado en: ${config.path}`));
}

/**
 * Valida que la configuración tenga la estructura esperada.
 * @param {any} configObj Objeto parseado del JSON
 * @returns {boolean}
 */
function validateConfig(configObj) {
  if (typeof configObj !== "object" || configObj === null) return false;
  if (typeof configObj.cli_name !== "string") return false;
  if (typeof configObj.commits_prefix !== "object" || configObj.commits_prefix === null) return false;

  const keys = ["feat", "fix", "chore", "release", "docs", "test", "style", "refactor", "perf", "build", "ci", "revert"];

  for (const key of keys) {
    if (!(key in configObj.commits_prefix)) return false;
    if (typeof configObj.commits_prefix[key] !== "string") return false;
  }
  return true;
}
