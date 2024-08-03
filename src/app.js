import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// feito para conseguir importar modulos dentro de outras pastas do src ***
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.env.NODE_PATH = path.resolve(__dirname, '../node_modules');
import('module').then(module => module.createRequire(import.meta.url)).then(require => require('module').Module._initPaths());
// ***

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/index.js';
import swaggerConfig from './config/swagger.js';


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
swaggerConfig(app);



app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
