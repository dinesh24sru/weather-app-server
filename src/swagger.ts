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
        "A simple API that provides the short forecast and temperature characterization (hot, cold, or moderate) for a given location using the National Weather Service API.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/app.ts"], // Path to the annotated source file
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
