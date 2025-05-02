import React from 'react';
import { Cloud, CloudRain, Sun, Thermometer } from 'lucide-react';
import './WeatherDisplay.css';

const getWeatherIcon = (temp) => {
  if (temp >= 25) return Sun;
  if (temp <= 15) return CloudRain;
  return Cloud;
};

const WeatherDisplay = ({ temperature = 24, location = "São Paulo", state = "Brasil", greeting = "Bom dia", dateInfo = "Data não disponível" }) => {
  const WeatherIcon = getWeatherIcon(temperature);

  return (
    <div className="weather-card">
      <div className="weather-icon">
        <WeatherIcon size={120} />
      </div>

      <div className="weather-info">
        <div className="weather-temp">
          <div className="temp-display">
            {temperature}
            <span className="temp-unit">°C</span>
          </div>

          <div className="feels-like">
            <Thermometer size={16} />
            <span>Sensação térmica: {temperature !== '--' ? temperature - 1 : '--'}°C</span>
          </div>
        </div>

        <div className="weather-location">
          <p className="greeting">{greeting}</p>
          <p className="location-display">{location}, {state}</p>
          <p className="date-display">{dateInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;