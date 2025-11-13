# 🌤️ Weather Forecast API (Node.js + TypeScript + Express)

This project is a simple HTTP server built with **Node.js**, **TypeScript**, and **Express** that provides a **short weather forecast** and a **temperature characterization** ("hot", "cold", "moderate") for a given latitude and longitude.  
It uses the **National Weather Service (NWS) API** as its data source. https://www.weather.gov/documentation/services-web-api#/default/point

---

## 🚀 Features

- Accepts latitude and longitude via query parameters  
- Returns today's **short forecast** (e.g., "Partly Cloudy")  
- Categorizes temperature as:
  - **Cold**: below 50°F  
  - **Moderate**: between 50°F and 85°F  
  - **Hot**: above 85°F  
- Uses official **NWS API** data  https://www.weather.gov/documentation/services-web-api#/default/point
- Written entirely in **TypeScript**

---

## 🧩 Tech Stack

- Node.js  
- Express.js  
- TypeScript  
- Axios  

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/weather-app-server.git
cd weather-server
```
### 2. Install Dependencies
```bash
npm install or npm i
```
### 3. Run the application in local
```bash
npm start or npm run start
```
### API USaage
```bash
GET /weather?lat=<latitude>&lon=<longitude>

Example(Try hitting from POSTMAN)
GET http://localhost:3000/weather?lat=39.0&lon=-77.0

```
## Swagger docs
After running the application you can access the swagger documentation using below URL

```bash
http://localhost:3000/docs/
```

### Notes
```bash
Uses the National Weather Service API.

Include a valid User-Agent header when calling NWS (already included in this project).

You can adjust temperature category thresholds in the categorizeTemperature() function.

```
