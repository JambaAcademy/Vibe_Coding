import React from 'react';
import WeatherIcon from './WeatherIcon';

function Forecast({ data }: { data: any[] }) {
  return (
    <div className="forecast card">
      <h2>5-Day Forecast</h2>
      <div className="forecast-list">
        {data.map((item, idx) => (
          <div key={idx} className="forecast-item">
            <div className="date">{new Date(item.dt_txt).toLocaleDateString()}</div>
            <WeatherIcon icon={item.weather[0].icon} />
            <div className="temp">{Math.round(item.main.temp)}°C</div>
            <div className="desc">{item.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
