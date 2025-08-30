import React from 'react';
import WeatherIcon from './WeatherIcon';

function CurrentWeather({ data }: { data: any }) {
  return (
    <div className="current-weather card">
      <h2>Current Conditions</h2>
      <div className="weather-main">
        <WeatherIcon icon={data.weather[0].icon} />
        <div>
          <div className="temp">{Math.round(data.main.temp)}°C</div>
          <div>{data.weather[0].description}</div>
        </div>
      </div>
      <div className="weather-details">
        <span>Humidity: {data.main.humidity}%</span>
        <span>Wind: {Math.round(data.wind.speed)} m/s</span>
      </div>
      <div className="city">{data.name}, {data.sys.country}</div>
    </div>
  );
}

export default CurrentWeather;
