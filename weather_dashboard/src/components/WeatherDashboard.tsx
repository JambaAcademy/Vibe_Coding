import React, { useState } from 'react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key

function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError('');
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();
      if (!weatherRes.ok) {
        if (weatherRes.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        }
        throw new Error(weatherData.message || 'City not found');
      }

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();
      if (!forecastRes.ok) {
        if (forecastRes.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        }
        throw new Error(forecastData.message || 'Forecast not found');
      }

      // Get one forecast per day (at noon)
      const dailyForecast = forecastData.list.filter((item: any) =>
        item.dt_txt.includes('12:00:00')
      ).slice(0, 5);

      setWeather(weatherData);
      setForecast(dailyForecast);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div className="dashboard" style={{ animation: 'fadeIn 1s' }}>
      <h1>Weather Dashboard</h1>
      <div style={{
        textAlign: 'center',
        color: '#555',
        fontSize: '1.15rem',
        marginBottom: '1.5rem',
        fontFamily: 'Montserrat, Arial, sans-serif',
        letterSpacing: '1px'
      }}>
        Get real-time weather and 5-day forecast for any city, with a modern look!
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      {weather && <CurrentWeather data={weather} />}
      {forecast.length > 0 && <Forecast data={forecast} />}
    </div>
  );
}

export default WeatherDashboard;
