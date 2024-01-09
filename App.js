import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
const API_KEY = 'd6e069d70787e2a305f6c13af7d2eba1'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherData = async () => {
    try {
      setError(null);
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Change to 'imperial' for Fahrenheit
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeatherData}>Get Weather</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
