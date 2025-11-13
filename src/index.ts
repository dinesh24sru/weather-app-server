import app from "./app";
import { setupSwagger } from "./swagger";

const PORT = process.env.PORT || 3000;

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`🌤️ Weather server running at http://localhost:${PORT}`);
});
