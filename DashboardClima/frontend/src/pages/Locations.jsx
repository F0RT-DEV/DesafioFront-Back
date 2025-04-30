import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocationModal from '../components/LocationModal';
import './Locations.css';

const sampleLocations = [
  { id: 1, name: "São Paulo", state: "SP", date: "2025-04-25 10:30", temperature: 24 },
  { id: 2, name: "Rio de Janeiro", state: "RJ", date: "2025-04-25 09:45", temperature: 28 },
  { id: 3, name: "Belo Horizonte", state: "MG", date: "2025-04-25 08:15", temperature: 22 },
  { id: 4, name: "Curitiba", state: "PR", date: "2025-04-25 08:30", temperature: 17 },
  { id: 5, name: "Porto Alegre", state: "RS", date: "2025-04-25 09:00", temperature: 19 },
];

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLocations(sampleLocations);
  }, []);

  const handleAddLocation = (newLocation) => {
    setLocations(prev => [...prev, { ...newLocation, id: prev.length + 1 }]);
    setShowModal(false);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Localizações</h1>
        <button className="add-button" onClick={() => setShowModal(true)}>Adicionar Local</button>
      </div>

      <div className="cards-container">
        {locations.map(location => (
          <div key={location.id} className="location-card1">
            <div className="seila">
              <div className="seladnovo">
              <h2>{location.state}</h2>
                <p><strong></strong> {location.name}</p>
                <p><strong></strong> {location.date}</p>
              </div>
              <div className="temp">
              <p><strong></strong> {location.temperature}°C</p>
              <div className="temp-icon">
                {location.temperature > 25 ? '☀️' : location.temperature < 20 ? '🌧️' : '🌤️'}
              </div>
            </div>
            </div>
            
            <Link to="/records">DETALHE</Link>
          </div>
        ))}
      </div>

      {showModal && <LocationModal onClose={() => setShowModal(false)} onSave={handleAddLocation} />}
    </div>
  );
};

export default Locations;