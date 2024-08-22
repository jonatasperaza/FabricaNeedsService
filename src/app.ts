import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import router from './routes/index.js';
import swaggerConfig from './config/swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.env.NODE_PATH = path.resolve(__dirname, '../node_modules');
import('module')
  .then(module => module.createRequire(import.meta.url))
  .then(require => require('module').Module._initPaths());


const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
swaggerConfig(app);
app.use('/', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
