import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWeatherData } from "../utils/api"; // Assuming your API call is defined here
import "../styles/Weather.css"; // Import the CSS

const WeatherPage = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data
    fetchWeatherData(cityName)
      .then((data) => setWeatherData(data))
      .catch((err) => setError("Failed to fetch weather data"));
  }, [cityName]);

  // Function to determine background class based on weather condition
  const getWeatherBackgroundClass = (weather) => {
    if (!weather || !weather[0]) return "default-bg";
    const mainCondition = weather[0].main.toLowerCase();

    switch (mainCondition) {
      case "clear":
        return "sunny";
      case "rain":
      case "drizzle":
        return "rainy";
      case "clouds":
        return "cloudy";
      case "snow":
        return "snowy";
      case "mist":
      case "fog":
        return "mist";
      default:
        return "default-bg";
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return (
      <div className="loading-spinner"></div> // Loading spinner
    );
  }

  const weatherBackgroundClass = getWeatherBackgroundClass(weatherData.weather);

  return (
    <div className={`weather-page ${weatherBackgroundClass}`}>
      <h1>Weather in {cityName}</h1>
      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
      />
      <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
      <p className="weather-detail">
        Weather: {weatherData.weather[0].description}
      </p>
      <p className="weather-detail">Humidity: {weatherData.main.humidity}%</p>
      <p className="weather-detail">Wind Speed: {weatherData.wind.speed} m/s</p>
      <p className="weather-detail">Pressure: {weatherData.main.pressure} hPa</p>
      <p className="weather-detail">
        Max Temp: {weatherData.main.temp_max}°C | Min Temp:{" "}
        {weatherData.main.temp_min}°C
      </p>
    </div>
  );
};

export default WeatherPage;
