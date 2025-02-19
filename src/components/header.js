import chalk from "chalk";
import figlet from "figlet";
import config from "../helpers/config.js";


export default function header() {
  const cliName = config.get("cli_name");
  return console.log(chalk.yellowBright(figlet.textSync(cliName, { horizontalLayout: "full" })));
}
