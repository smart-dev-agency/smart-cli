import chalk from "chalk";
import figlet from "figlet";

export default function header() {
  return console.log(
    chalk.yellowBright(
      figlet.textSync("Smart CLI", { horizontalLayout: "full" })
    )
  );
}
