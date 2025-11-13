export function categorizeTemperature(tempF: number): "cold" | "moderate" | "hot" {
  if (tempF < 50) return "cold";
  if (tempF > 85) return "hot";
  return "moderate";
}
