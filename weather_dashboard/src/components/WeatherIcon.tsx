import React from 'react';

function WeatherIcon({ icon }: { icon: string }) {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="weather icon"
      className="weather-icon"
    />
  );
}

export default WeatherIcon;
