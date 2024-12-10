#! /usr/bin/env node

import { program } from "commander";
import { greeting } from "./commands/greeting.js";
import commandList from "./commands/commands_list.js";
import commit from "./commands/git_commit.js";
import newBranch from "./commands/new_branch.js";
import testCoverage from "./commands/test_coverage.js";
import useTemplate from "./commands/use_template.js";

program
  .command("greeting", { isDefault: true })
  .description("Saludo inicial")
  .action(greeting);

program
  .command("list")
  .description("Listar los comandos disponibles")
  .action(commandList);

program
  .command("commit")
  .description("Realizar un commit a un repositorio")
  .action(commit);

program
  .command("new_branch")
  .description("Crear una nueva rama de git desde la rama actual")
  .action(newBranch);

program
  .command("test_coverage")
  .description(
    "Ejecuta un test coverage sobre un repositorio de Flutter usando lcov."
  )
  .action(testCoverage);

program
  .command("use_template")
  .description(
    "Permite crear la estructura de un nuevo componente de Flutter desde un template"
  )
  .action(useTemplate);


program.parse();
