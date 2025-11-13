import express from "express";
import weatherRoutes from "./routes/weatherRoutes";
import { setupSwagger } from "./swagger";

const app = express();

app.use(express.json());
app.use("/", weatherRoutes);

// Setup Swagger after routes
setupSwagger(app);

export default app;
