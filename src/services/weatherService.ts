import axios from "axios";
import { categorizeTemperature } from "../utils/temperatureUtils";

export async function getWeatherForecast(lat: string, lon: string) {
  const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
    const pointsResponse = await axios.get(pointsUrl, {
      headers: { "User-Agent": "weather-server (example@example.com)" },
    });

    const forecastUrl = pointsResponse.data.properties.forecast;
    if (!forecastUrl) {
      throw new Error("Forecast data not available for this location" );
    }

    const forecastResponse = await axios.get(forecastUrl, {
      headers: { "User-Agent": "weather-server (example@example.com)" },
    });

    const periods = forecastResponse?.data?.properties?.periods;
    const todayForecast = periods.find((p: any) => p.isDaytime);

    if (!todayForecast) {
      throw new Error("Today's forecast not found" );
    }

    const shortForecast = todayForecast.shortForecast;
    const temperature = todayForecast.temperature;
    const temperatureUnit = todayForecast.temperatureUnit;
    const tempCategory = categorizeTemperature(temperature);

    return {
      location: { lat, lon },
      shortForecast,
      temperature: `${temperature}°${temperatureUnit}`,
      temperatureCategory: tempCategory,
    };
}
