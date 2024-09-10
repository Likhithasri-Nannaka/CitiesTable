import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeatherData } from '../utils/api'; // Assuming your API call is defined here
import '../styles/Weather.css'; // Assuming your CSS file is located here

const WeatherPage = () => {
  const { cityName } = useParams(); // Gets the city name from the URL
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData(cityName); // Fetch the weather data
        setWeatherData(data); // Set the weather data in state
      } catch (err) {
        setError('Failed to fetch weather data');
      }
    };
    
    getWeatherData();
  }, [cityName]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`weather-page ${weatherData.weather[0].main.toLowerCase()}`}>
      <h1>Weather in {cityName}</h1>

      {/* Current Weather Information */}
      <div className="weather-section">
        <h2>Current Weather</h2>
        <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
        <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
        <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
        <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
        <p><strong>Max Temp:</strong> {weatherData.main.temp_max}°C</p>
        <p><strong>Min Temp:</strong> {weatherData.main.temp_min}°C</p>
      </div>
    </div>
  );
};

export default WeatherPage;
