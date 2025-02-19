import Conf from "conf";

const config = new Conf({
  projectName: "smart-cli",
  defaults: {
    cli_name: "Smart CLI",
    commits_prefix: {
      feat: "",
      fix: "",
      chore: "",
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
});

export default config;
