const commitsTypes = [
  {
    name: "feat",
    description: "Agregar nuevas funciones o nuevas características",
  },
  { name: "fix", description: "Arreglar o solución errores" },
  {
    name: "chore",
    description: "Cambiar el archivo de configuración",
  },
  {
    name: "release",
    description: "Publicación de una nueva versión",
  },
  {
    name: "docs",
    description: "Sólo modificar o cambios en documentación",
  },
  {
    name: "test",
    description: "Agregue test nuevos para faltante, corrige o modifique la prueba existente",
  },
  {
    name: "style",
    description: "Modificación o Cambios del estilo que no afectan el código (la lógica)",
  },
  {
    name: "refactor",
    description: "Cambios de código que no corrigen errores, no añaden funciones ni nueva característica)",
  },
  {
    name: "perf",
    description: "Cambios de código para mejorar el rendimiento performance de la aplicación",
  },
  {
    name: "build",
    description: "Cambios que afectan deploy el sistema de compilación o las dependencias externas.",
  },
  {
    name: "ci",
    description: "Cambios en scripts y archivos de configuración de la integración continua CI.",
  },
  {
    name: "revert",
    description: "Revierte cambios a un estado anterior en los commit.",
  },
];
export default commitsTypes;
