const availableCommands = [
  {
    name: "commit",
    description:
      "Permite realizar commits a repositorios de Git siguiendo los lineamientos de buenas prácticas, debes tener el entorno previamente configurado.",
  },
  {
    name: "new_branch",
    description: "Permite crear una nueva rama de Git a partir de la rama actual siguiendo los lineamientos de buenas prácticas.",
  },
  {
    name: "test_coverage",
    description: "Ejecuta un test coverage sobre un repositorio de Flutter usando lcov.",
  },
  {
    name: "update_config",
    description: "Permite actualizar la configuración del CLI a partir de un archivo JSON.",
  },
  // {
  //   name: "use_template",
  //   description:
  //     "Permite crear la estructura de un componente de Flutter usando un template predefinido",
  // },
];

export default availableCommands;
