// src/config/swagger.js
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
      // Add your production server URL here
    ],
  },
  apis: ['src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default function (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
