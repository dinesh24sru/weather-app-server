import { Request, Response } from "express";
import { getWeatherForecast } from "../services/weatherService";

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
 *         description: Successful response
 *       400:
 *         description: Missing query parameters
 *       500:
 *         description: Server error
 */
export async function getWeather(req: Request, res: Response) {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Please provide lat and lon query parameters" });
    }

    const data = await getWeatherForecast(lat as string, lon as string);
    return res.json(data);
  } catch (error: any) {
    console.error("Error fetching weather:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch forecast data" });
  }
}
