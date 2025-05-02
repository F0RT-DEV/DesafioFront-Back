import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import WeatherDisplay from '../components/WeatherDisplay';
import TemperatureChart from '../components/TemperatureChart';
import { TrendingUp, Wind, Flame, Snowflake } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const { id } = useParams();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [extremeLocations, setExtremeLocations] = useState({ hot: [], cold: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch selected location
        if (location.state?.selectedLocation) {
          const locationWithId = {
            ...location.state.selectedLocation,
            id: id || location.state.selectedLocation.id
          };
          setSelectedLocation(locationWithId);
          localStorage.setItem('lastLocation', JSON.stringify(locationWithId));
        } else {
          const saved = localStorage.getItem('lastLocation');
          if (saved) {
            setSelectedLocation(JSON.parse(saved));
          }
        }

        // Fetch extreme locations
        const response = await axios.get('http://localhost:3000/locations/extremes');
        setExtremeLocations(response.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state, id]);

  const getGreeting = () => {
    try {
      if (!selectedLocation?.time) return 'Boa noite';
      
      const timeParts = selectedLocation.time.split(':');
      if (timeParts.length < 2) return 'Boa noite';
      
      const hour = parseInt(timeParts[0], 10);
      
      if (isNaN(hour)) return 'Boa noite';
      
      if (hour >= 5 && hour < 12) return 'Bom dia';
      if (hour >= 12 && hour < 18) return 'Boa tarde';
      return 'Boa noite';
    } catch (e) {
      console.error("Erro ao determinar saudação:", e);
      return 'Boa noite';
    }
  };

  const formatDate = (recordDate) => {
    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
                 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  
    let dateObj;
    
    if (recordDate) {
      try {
        if (typeof recordDate === 'string' && recordDate.includes('/')) {
          const [day, month, year] = recordDate.split('/');
          dateObj = new Date(`${year}-${month}-${day}`);
        } 
        else if (recordDate instanceof Date && !isNaN(recordDate)) {
          dateObj = recordDate;
        }
        else {
          dateObj = new Date(recordDate);
        }
      } catch (e) {
        console.error("Erro ao parsear data:", e);
        dateObj = new Date();
      }
    } else {
      dateObj = new Date();
    }
  
    if (isNaN(dateObj.getTime())) {
      dateObj = new Date();
    }
  
    const diaSemana = dias[dateObj.getDay()];
    const dia = dateObj.getDate();
    const mes = meses[dateObj.getMonth()];
    const ano = dateObj.getFullYear();
  
    return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="app-container">
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <WeatherDisplay 
            temperature={selectedLocation?.temperature || '--'} 
            location={selectedLocation?.locationName || selectedLocation?.name || 'Local Desconhecido'} 
            state={selectedLocation?.state || ''}
            greeting={`${getGreeting()}, ${selectedLocation?.locationName || selectedLocation?.name || 'visitante'}!`}
            dateInfo={formatDate(selectedLocation?.date)}
          />

          <div className="temperature-chart-section">
            <h2 className="section-title">Temperaturas Recentes</h2>
            <TemperatureChart locationId={id} locationData={selectedLocation} />
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="extreme-locations-section">
            <h2 className="section-title">Locais Extremos</h2>
            
            <div className="extreme-locations-container">
              <div className="hot-locations">
                <div className="extreme-header">
                  <Flame size={20} color="#ff6464" />
                  <h3>Mais Quentes</h3>
                </div>
                {extremeLocations.hot.map((location, index) => (
                  <div key={`hot-${index}`} className="location-card hot">
                    <span className="location-rank">{index + 1}º</span>
                    <div className="location-info">
                      <p className="location-name">{location.local}</p>
                      <p className="location-temperature">{location.temperatura}°C</p>
                      <p className="location-place">{location.estado}, {location.pais}</p>
                      <p className="location-date">{location.data}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cold-locations">
                <div className="extreme-header">
                  <Snowflake size={20} color="#6464ff" />
                  <h3>Mais Frios</h3>
                </div>
                {extremeLocations.cold.map((location, index) => (
                  <div key={`cold-${index}`} className="location-card cold">
                    <span className="location-rank">{index + 1}º</span>
                    <div className="location-info">
                      <p className="location-name">{location.local}</p>
                      <p className="location-temperature">{location.temperatura}°C</p>
                      <p className="location-place">{location.estado}, {location.pais}</p>
                      <p className="location-date">{location.data}</p>
                    </div>
                  </div>
                ))}
              </div>
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