import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

function categorizeTemperature(tempF: number): "cold" | "moderate" | "hot" {
  if (tempF < 50) return "cold";
  if (tempF > 85) return "hot";
  return "moderate";
}

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get today's short forecast and temperature category
 *     description: Returns the short weather forecast and temperature characterization (hot, cold, or moderate) for the given coordinates.
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitude coordinate (e.g., 39.0)
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitude coordinate (e.g., -77.0)
 *     responses:
 *       200:
 *         description: Successful response with forecast and temperature category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: string
 *                     lon:
 *                       type: string
 *                 shortForecast:
 *                   type: string
 *                 temperature:
 *                   type: string
 *                 temperatureCategory:
 *                   type: string
 *       400:
 *         description: Missing query parameters
 *       500:
 *         description: Server error fetching weather data
 */
app.get("/weather", async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Please provide latitude(lat) and longitide(lon) query parameters" });
    }

    const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
    const pointsResponse = await axios.get(pointsUrl, {
      headers: { "User-Agent": "weather-server (example@example.com)" },
    });

    const forecastUrl = pointsResponse.data.properties.forecast;
    if (!forecastUrl) {
      return res.status(404).json({ error: "Forecast data not available for this location" });
    }

    const forecastResponse = await axios.get(forecastUrl, {
      headers: { "User-Agent": "weather-server (example@example.com)" },
    });

    const periods = forecastResponse?.data?.properties?.periods;
    const todayForecast = periods.find((p: any) => p.isDaytime);

    if (!todayForecast) {
      return res.status(404).json({ error: "Today's forecast not found" });
    }

    const shortForecast = todayForecast.shortForecast;
    const temperature = todayForecast.temperature;
    const temperatureUnit = todayForecast.temperatureUnit;
    const tempCategory = categorizeTemperature(temperature);

    return res.json({
      location: { lat, lon },
      shortForecast,
      temperature: `${temperature}°${temperatureUnit}`,
      temperatureCategory: tempCategory,
    });
  } catch (error: any) {
    console.error("Error fetching weather:", error.message);
    return res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

export default app;
