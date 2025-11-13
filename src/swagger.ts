import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Weather Forecast API",
      version: "1.0.0",
      description:
        "Provides the short forecast and temperature category (hot, cold, or moderate) for a given latitude and longitude using the National Weather Service API.",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
