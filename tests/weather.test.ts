import request from "supertest";
import app from "../src/app"; // separate your Express app into app.ts

describe("GET /weather", () => {
  it("should return 400 if no coordinates are provided", async () => {
    const res = await request(app).get("/weather");
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("should return forecast data for valid coordinates (mocked)", async () => {
    // Mock API call in a real test setup
    const res = await request(app).get("/weather?lat=39.0&lon=-77.0");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortForecast");
    expect(res.body).toHaveProperty("temperatureCategory");
  });
});
