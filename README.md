# 🌦️ Dynamic Weather Dashboard

A fully dynamic weather dashboard built with **JavaScript**, **OpenWeatherMap API**, and **Geolocation API**.  
It provides **real-time weather updates** and a **5-day forecast** for any city worldwide or based on the user's current location.

---

## ✨ Features

- 🌍 Fetch current weather by **city name** or **geolocation**
- 📅 5-Day weather forecast (daily at noon)
- 📊 Displays temperature, humidity, wind speed, pressure, and more
- 🖼️ Weather icons with dynamic updates
- 📲 Responsive and clean UI
- ⚡ Error handling for invalid city names, API issues, or denied geolocation
- 🔄 Loading indicators and error messages for smooth UX

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
- **API:** [OpenWeatherMap API](https://openweathermap.org/api)
- **Browser APIs:** Geolocation API

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
```

### 2. Get Your OpenWeatherMap API Key
- Create an account on OpenWeatherMap  
- Generate an API key from the dashboard  
- Replace the placeholder in `script.js`:
```js
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
```

### 3. Run the Project
- Simply open `index.html` in your browser.  
- For better development, use a live server (e.g., VS Code Live Server extension).

---

## 📂 Project Structure
```
weather-dashboard/
│── index.html           # Main HTML file
│── style.css            # Stylesheet
│── script.js            # Core JavaScript logic
│── README.md            # Project documentation
│── docs/
│    └── overview.md     # Detailed docs for developers
```

---

## 🎮 Usage
- Enter a city name in the input box and click **Search**  
- Or click **Current Location** to fetch weather using geolocation  

View:
- 🌡️ Current temperature  
- 🌫️ Feels like temperature  
- 💧 Humidity  
- 🌬️ Wind speed  
- 📉 Min / Max temperatures  
- 📊 5-Day forecast  

---

## 🖼️ Screenshots
(Add your project screenshots here)

---

## ⚠️ Error Handling
- Invalid city name → Shows *"City not found or API error."*  
- Geolocation denied → Shows *"Permission denied, please enter a city manually."*  
- API key issue → Shows *"Please verify your API key and try again."*  

---

## 🧩 Future Improvements
- 🌐 Add unit toggle (°C / °F)  
- 🌓 Dark mode support  
- 📍 Save favorite cities for quick access  

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  
Fork the repo, create a branch, and submit a PR.  

---

## 📜 License
This project is licensed under the **MIT License**.  
Feel free to use and modify it.

---

# 📄 docs/overview.md  

```markdown
# 🌦️ Weather Dashboard – Developer Documentation

This document provides a detailed explanation of the **code structure** and **logic flow** for developers.

---

## 🔑 Key Constants
```js
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
```

- `API_KEY`: Your OpenWeatherMap API key  
- `WEATHER_BASE_URL`: Endpoint for current weather  
- `FORECAST_BASE_URL`: Endpoint for 5-day forecast  

---

## 📌 DOM Elements
All UI elements (city input, buttons, weather display, errors, etc.) are cached with `getElementById` for efficient updates.

---

## ⚙️ Core Functions

### 1. Utility Functions
- `showLoading()` → Shows loading spinner, hides dashboard  
- `showError(message)` → Displays an error message  
- `hideLoadingAndError()` → Restores dashboard view  
- `formatUnixTimestamp()` → Converts UTC to city’s local time  
- `formatForecastDate()` → Formats forecast dates  

### 2. Display Functions
- `displayCurrentWeather(data)` → Updates the DOM with current weather  
- `displayForecast(data)` → Renders a 5-day forecast  

### 3. API Fetch Functions
- `fetchWeatherByCoordinates(lat, lon)`  
   Fetches both current weather and forecast using latitude/longitude.  

- `fetchWeatherByCity(city)`  
   Fetches current weather for a city, then uses its coordinates to fetch forecast.  

Both include error handling for invalid responses.

### 4. Geolocation
- `getGeolocation()` → Uses `navigator.geolocation` to get current location  
- `successCallback(position)` → Calls `fetchWeatherByCoordinates` with user’s coords  
- `errorCallback(error)` → Handles geolocation errors  

### 5. Event Listeners
- Search button → Fetch by city  
- Current Location button → Fetch by geolocation  
- Enter key → Triggers search  
- On page load → Automatically fetches current location weather  

---

## 🖥️ Logic Flow
```
User Action (City / Location)
      ↓
Fetch Weather (API Call)
      ↓
Parse Data (JSON)
      ↓
Display Weather + Forecast
      ↓
Handle Errors (if any)
```

---

## 🔮 Extensibility
Developers can easily extend this project by:
- Adding unit toggle (Celsius/Fahrenheit)  
- Supporting hourly forecasts  
- Implementing offline caching (localStorage / IndexedDB)  
- Theming (Dark/Light mode)  

---

## 📚 API References
- [Current Weather API](https://openweathermap.org/current)  
- [5-Day Forecast API](https://openweathermap.org/forecast5)  
- [Weather Icons](https://openweathermap.org/weather-conditions)
```

