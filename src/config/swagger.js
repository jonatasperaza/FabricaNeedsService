import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fabrica Needs Service API',
      version: '1.0.0',
      description: 'API documentation for Fabrica Needs Service',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
      {
        url: 'https://fabricaneeds-back-equipe5-3edw.onrender.com',
        description: 'Production server',
      }
    ],
  },
  apis: ['src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default function(app) {
  app.get('/', (req, res, next) => {
    if (req.hostname === 'localhost') {
      swaggerUi.setup(swaggerDocs)(req, res, next);
    } else {
      res.send('API funcionando');
    }
  });
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
