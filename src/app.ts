import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

function categorizeTemperature(tempF: number): "cold" | "moderate" | "hot" {
  if (tempF < 50) return "cold";
  if (tempF > 85) return "hot";
  return "moderate";
}

// Endpoint: /weather?lat=39.0&lon=-77.0
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
