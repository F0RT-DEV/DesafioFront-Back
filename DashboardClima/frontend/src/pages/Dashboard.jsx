import React, { useState, useEffect } from 'react';
import WeatherDisplay from '../components/WeatherDisplay';
import TemperatureChart from '../components/TemperatureChart';
import { MapPin, TrendingUp, Thermometer, Wind } from 'lucide-react';
import './Dashboard.css';

const sampleRecords = [
  { id: 1, locationName: "São Paulo", temperature: 27 },
  { id: 2, locationName: "Rio de Janeiro", temperature: 30 },
  { id: 3, locationName: "Curitiba", temperature: 19 },
  { id: 4, locationName: "Salvador", temperature: 28 },
  { id: 5, locationName: "Fortaleza", temperature: 31 },
];

const Dashboard = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(sampleRecords);
  }, []);

  const topHotLocations = [...records].sort((a, b) => b.temperature - a.temperature).slice(0, 3);

  return (
    <div className="app-container">
      <div className="dashboard-grid">
        {/* Main Content */}
        <div className="dashboard-main">
          <WeatherDisplay 
            temperature={27} 
            location="São Paulo" 
            state="Brasil" 
            description="Chuva moderada"
            windSpeed="5.0 km/h"
            humidity="78%"
          />

          <div className="temperature-chart-section">
            <h2 className="section-title">Temperaturas Recentes</h2>
            <TemperatureChart />
          </div>
        </div>

        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="top-locations-section">
            <h2 className="section-title">Locais Mais Quentes</h2>
            <div className="top-locations-list">
              {topHotLocations.map((loc) => (
                <div key={loc.id} className="location-card">
                  <Thermometer size={18} />
                  <div className="location-info">
                    <span className="location-name">{loc.locationName}</span>
                    <span className="location-temp">{loc.temperature}°C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="trend-section">
            <h2 className="section-title">Tendências</h2>
            <div className="trend-card">
              <TrendingUp size={24} />
              <div>
                <p className="trend-title">Aquecimento</p>
                <p className="trend-message">A média de hoje está 1.2°C acima de ontem.</p>
              </div>
            </div>

            <div className="trend-card">
              <Wind size={24} />
              <div>
                <p className="trend-title">Vento Atual</p>
                <p className="trend-message">5 km/h NE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;