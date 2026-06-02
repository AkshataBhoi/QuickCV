import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

console.log("ENV FILE LOADED FROM:", path.resolve(__dirname, "../../.env"));

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  console.log(process.env.GROQ_API_KEY);
  process.exit(1);
}
