import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const currentDirectory = path.dirname(__filename);

const getAppDirectory = currentDirectory.replace(/[^/]*$/, "");

export default getAppDirectory;
