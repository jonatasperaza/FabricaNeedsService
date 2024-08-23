import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import { fileURLToPath } from "url";
import { dirname } from "path";

import router from "./routes/index.js";
import swaggerConfig from "./config/swagger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.env.NODE_PATH = path.resolve(__dirname, "../node_modules");

const app: Express = express();

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
// app.use(helmet.hsts({ maxAge: 31536000 })); // Protege contra ataques de HTTPS
// app.use(helmet.ieNoOpen()); // Previne que o arquivo seja aberto no IE

app.use(bodyParser.json());
app.use(cors());
swaggerConfig(app);
app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
