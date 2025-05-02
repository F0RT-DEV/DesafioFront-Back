import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import WeatherDisplay from '../components/WeatherDisplay';
import TemperatureChart from '../components/TemperatureChart';
import { MapPin, TrendingUp, Thermometer, Wind } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const { id } = useParams();
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (location.state?.selectedLocation) {
      setSelectedLocation(location.state.selectedLocation);
      localStorage.setItem('lastLocation', JSON.stringify(location.state.selectedLocation));
    } else {
      const saved = localStorage.getItem('lastLocation');
      if (saved) {
        setSelectedLocation(JSON.parse(saved));
      }
    }
  }, [location.state]);

  return (
    <div className="app-container">
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <WeatherDisplay 
            temperature={selectedLocation?.temperature || '--'} 
            location={selectedLocation?.locationName || 'Local Desconhecido'} 
            state={selectedLocation?.estado || ''} 
            description="Chuva moderada"
            windSpeed="5.0 km/h"
            humidity="78%"
          />

          <div className="temperature-chart-section">
            <h2 className="section-title">Temperaturas Recentes</h2>
            <TemperatureChart location={selectedLocation} />
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="top-locations-section">
            <h2 className="section-title">Locais Mais Quentes</h2>
            <div className="top-locations-list">
              {/* Você pode remover isso se não estiver mostrando top 3 globalmente */}
              <p>Exibindo o local ID #{id}</p>
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
