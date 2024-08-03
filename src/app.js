import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index.js";
import swaggerConfig from "./config/swagger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.env.NODE_PATH = path.resolve(__dirname, "../node_modules");
import("module")
  .then((module) => module.createRequire(import.meta.url))
  .then((require) => require("module").Module._initPaths());

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "localhost:3000"],
        scriptSrc: ["'self'", "localhost:3000"],
      },
    },
    frameguard: {
      action: "deny",
    },
    referrerPolicy: {
      policy: "no-referrer",
    },
  })
);
app.use(helmet.frameguard({ action: "deny" })); // Protege contra clickjacking
app.use(helmet.noSniff()); // Protege contra MIME type sniffing
app.use(helmet.xssFilter()); // Protege contra ataques XSS
app.use(helmet.hidePoweredBy()); // Oculta o cabeçalho X-Powered-By

app.use(bodyParser.json());
app.use(cors());
app.use("/", router);
swaggerConfig(app);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
