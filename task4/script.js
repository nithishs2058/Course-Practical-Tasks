
// DOM Elements

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");

const statusMessage = document.getElementById("status-message");
const weatherContent = document.getElementById("weather-content");

const cityName = document.getElementById("city-name");
const countryName = document.getElementById("country-name");
const weatherIcon = document.getElementById("weather-icon");

const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const feelsLike = document.getElementById("feels-like");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const precipitation = document.getElementById("precipitation");
const feelsLikeDetail = document.getElementById("feels-like-detail");
const updatedTime = document.getElementById("updated-time");

// Weather Code Information

function getWeatherInfo(code) {

    const weatherConditions = {
        0: { description: "Clear sky", icon: "☀️" },
        1: { description: "Mainly clear", icon: "🌤️" },
        2: { description: "Partly cloudy", icon: "⛅" },
        3: { description: "Overcast", icon: "☁️" },
        45: { description: "Foggy", icon: "🌫️" },
        48: { description: "Depositing rime fog", icon: "🌫️" },
        51: { description: "Light drizzle", icon: "🌦️" },
        53: { description: "Moderate drizzle", icon: "🌦️" },
        55: { description: "Dense drizzle", icon: "🌧️" },
        61: { description: "Slight rain", icon: "🌧️" },
        63: { description: "Moderate rain", icon: "🌧️" },
        65: { description: "Heavy rain", icon: "🌧️" },
        71: { description: "Slight snowfall", icon: "🌨️" },
        73: { description: "Moderate snowfall", icon: "🌨️" },
        75: { description: "Heavy snowfall", icon: "❄️" },
        80: { description: "Rain showers", icon: "🌦️" },
        81: { description: "Moderate rain showers", icon: "🌧️" },
        82: { description: "Violent rain showers", icon: "⛈️" },
        95: { description: "Thunderstorm", icon: "⛈️" },
        96: { description: "Thunderstorm with hail", icon: "⛈️" },
        99: { description: "Thunderstorm with heavy hail", icon: "⛈️" }
    };

    return weatherConditions[code] || {
        description: "Weather information unavailable",
        icon: "🌡️"
    };
}

// Display Status Messages

function showStatus(message, isError = false) {

    statusMessage.textContent = message;
    statusMessage.classList.toggle("error", isError);

}

// Get City Coordinates

async function getCityCoordinates(city) {

    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

    url.search = new URLSearchParams({
        name: city,
        count: 1,
        language: "en",
        format: "json"
    });

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to connect to the location service.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found. Please enter a valid city name.");
    }

    return data.results[0];

}

// Get Weather Data

async function getWeather(latitude, longitude) {

    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.search = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation",
            "weather_code",
            "wind_speed_10m"
        ].join(","),
        timezone: "auto"
    });

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to retrieve weather information.");
    }

    const data = await response.json();

    if (!data.current) {
        throw new Error("Weather data is currently unavailable.");
    }

    return data;

}

// Display Weather Information

function displayWeather(location, weatherData) {

    const current = weatherData.current;

    const weatherInfo = getWeatherInfo(current.weather_code);

    cityName.textContent = location.name;

    countryName.textContent = [
        location.admin1,
        location.country
    ].filter(Boolean).join(", ");

    weatherIcon.textContent = weatherInfo.icon;

    temperature.textContent =
        `${Math.round(current.temperature_2m)}°C`;

    weatherDescription.textContent =
        weatherInfo.description;

    feelsLike.textContent =
        `Feels like ${Math.round(current.apparent_temperature)}°C`;

    humidity.textContent =
        `${current.relative_humidity_2m}%`;

    windSpeed.textContent =
        `${current.wind_speed_10m} km/h`;

    precipitation.textContent =
        `${current.precipitation} mm`;

    feelsLikeDetail.textContent =
        `${Math.round(current.apparent_temperature)}°C`;

    updatedTime.textContent =
        `Last updated: ${current.time.replace("T", " ")} (${weatherData.timezone})`;

    weatherContent.hidden = false;

}

// Main Weather Search Function

async function searchWeather(city) {

    if (!city.trim()) {
        showStatus("Please enter a city name.", true);
        return;
    }

    searchButton.disabled = true;
    searchButton.textContent = "Searching...";

    weatherContent.hidden = true;

    showStatus("Fetching weather information...");

    try {

        // Step 1: Get city coordinates

        const location = await getCityCoordinates(city);

        // Step 2: Get weather using coordinates

        const weatherData = await getWeather(
            location.latitude,
            location.longitude
        );

        // Step 3: Display weather information

        displayWeather(location, weatherData);

        showStatus("Weather information loaded successfully.");

    } catch (error) {

        showStatus(error.message, true);

    } finally {

        searchButton.disabled = false;
        searchButton.textContent = "Search";

    }

}

// Search Form Event

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    searchWeather(city);

});

// Load Default City

searchWeather("Chennai");
