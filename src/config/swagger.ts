import swaggerJsDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Fabrica Needs Service API",
      version: "1.0.0",
      description: "API documentation for Fabrica Needs Service",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
      {
        url: "https://fabricaneeds-back-equipe5-3edw.onrender.com",
        description: "Production server",
      },
    ],
  },
  apis: ["src/routes/*.ts"], // Atualize a extensão dos arquivos para .ts
} as swaggerJsDoc.Options;

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default function (app: Express): void {
  app.get("/", (req, res, next) => {
    if (req.hostname === "localhost") {
      swaggerUi.setup(swaggerDocs);
    } else {
      res.send("API funcionando");
    }
  });
}
