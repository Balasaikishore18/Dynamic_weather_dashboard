// ** IMPORTANT: Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual key **
const API_KEY = '';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// --- DOM Elements ---
const dashboardEl = document.getElementById('weather-dashboard');
const cityInputEl = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location-btn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-message');

// Current Weather Elements
const cityNameEl = document.getElementById('city-name');
const dateTimeEl = document.getElementById('date-time');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const pressureEl = document.getElementById('pressure');
const tempMaxEl = document.getElementById('temp-max');
const tempMinEl = document.getElementById('temp-min');
const forecastContainerEl = document.getElementById('forecast-container');

// --- Utility Functions ---
function showLoading() {
    dashboardEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    loadingEl.classList.remove('hidden');
}

function showError(message) {
    loadingEl.classList.add('hidden');
    dashboardEl.classList.add('hidden');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideLoadingAndError() {
    loadingEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    dashboardEl.classList.remove('hidden');
}

function formatUnixTimestamp(unixTime, timezoneOffsetSeconds) {
    const date = new Date((unixTime + timezoneOffsetSeconds) * 1000);
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC'
    };
    return date.toLocaleDateString('en-US', options);
}

function formatForecastDate(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// --- Display Functions ---
function displayCurrentWeather(data) {
    // API already gives Celsius because of units=metric
    const tempInCelsius = data.main.temp.toFixed(1);
    const feelsLikeCelsius = data.main.feels_like.toFixed(1);
    const maxTempCelsius = data.main.temp_max.toFixed(1);
    const minTempCelsius = data.main.temp_min.toFixed(1);

    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    dateTimeEl.textContent = formatUnixTimestamp(data.dt, data.timezone);
    weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIconEl.alt = data.weather[0].description;
    temperatureEl.textContent = `${tempInCelsius}°C`;
    descriptionEl.textContent = data.weather[0].description;

    feelsLikeEl.textContent = `${feelsLikeCelsius}°C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    windSpeedEl.textContent = `${data.wind.speed.toFixed(1)} m/s`;
    pressureEl.textContent = `${data.main.pressure} hPa`;
    tempMaxEl.textContent = `${maxTempCelsius}°C`;
    tempMinEl.textContent = `${minTempCelsius}°C`;
}

function displayForecast(data) {
    forecastContainerEl.innerHTML = '';
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyData.forEach(item => {
        const forecastDate = formatForecastDate(item.dt);
        const tempInCelsius = item.main.temp.toFixed(1);
        const iconCode = item.weather[0].icon;
        const description = item.weather[0].description;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <h4>${forecastDate}</h4>
            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">
            <p class="temp">${tempInCelsius}°C</p>
            <p class="desc">${description}</p>
        `;
        forecastContainerEl.appendChild(forecastItem);
    });
}

// --- API Fetching Logic ---
async function fetchWeatherByCoordinates(lat, lon) {
    showLoading();
    try {
        const currentWeatherUrl = `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await fetch(currentWeatherUrl);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok || weatherData.cod !== 200) {
            throw new Error(weatherData.message || "Failed to fetch current weather data.");
        }

        displayCurrentWeather(weatherData);

        const forecastUrl = `${FORECAST_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        if (forecastResponse.ok && forecastData.cod === "200") {
            displayForecast(forecastData);
        }

        hideLoadingAndError();

    } catch (error) {
        console.error("Weather fetching error:", error);
        showError(`Error: ${error.message}. Please verify your API key and try again.`);
    }
}

async function fetchWeatherByCity(city) {
    showLoading();
    try {
        const currentWeatherUrl = `${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await fetch(currentWeatherUrl);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok || weatherData.cod !== 200) {
            throw new Error(weatherData.message || "City not found or API error.");
        }

        displayCurrentWeather(weatherData);

        const cityLat = weatherData.coord.lat;
        const cityLon = weatherData.coord.lon;

        const forecastUrl = `${FORECAST_BASE_URL}?lat=${cityLat}&lon=${cityLon}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        if (forecastResponse.ok && forecastData.cod === "200") {
            displayForecast(forecastData);
        }

        hideLoadingAndError();

    } catch (error) {
        console.error("City weather fetching error:", error);
        showError(`Error: ${error.message}. Please try a different city.`);
    }
}

// --- Geolocation Logic ---
function successCallback(position) {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoordinates(latitude, longitude);
}

function errorCallback(error) {
    let message = 'Geolocation is disabled or permission denied. Please enter a city manually.';
    if (error.code === error.PERMISSION_DENIED) {
        message = 'Permission to access location was denied. Please enter a city manually.';
    } else if (error.code === error.POSITION_UNAVAILABLE) {
        message = 'Location information is unavailable.';
    } else if (error.code === error.TIMEOUT) {
        message = 'The request to get user location timed out.';
    }
    showError(message);
}

function getGeolocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        showError("Your browser does not support Geolocation. Please enter a city manually.");
    }
}

// --- Event Listeners ---
searchBtn.addEventListener('click', () => {
    const city = cityInputEl.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    } else {
        showError("Please enter a city name.");
    }
});

currentLocationBtn.addEventListener('click', getGeolocation);

cityInputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Load weather for current location on page load
document.addEventListener('DOMContentLoaded', getGeolocation);
