import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocationModal from '../components/LocationModal';
import './Locations.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Adicione esta linha

  useEffect(() => {
    fetch('http://localhost:3000/locais?limit=7')
      .then(res => res.json())
      .then(data => {
        console.log("Resposta da API:", data);
        const adaptados = data.map(loc => ({
          id_Local: loc.id_Local,
          name: loc.nome,
          state: loc.estado,
          country: loc.pais,
          date: loc.data_formatada,
          horario: loc.horario_formatado,
          temperature: loc.temperatura
        }));
        setLocations(adaptados);
      })
      .catch(err => console.error('Erro ao buscar locais:', err));
  }, [refreshKey]); // Adicione refreshKey como dependência


  // Atualiza a lista após adicionar novo local
  const handleAddLocation = () => {
    setRefreshKey(oldKey => oldKey + 1); // Force o useEffect a rodar novamente
    setShowModal(false); 
    
    fetch('http://localhost:3000/locais?limit=7')
      .then(res => res.json())
      .then(data => {
        const adaptados = data.map(loc => ({
          id_Local: loc.id_Local,
          name: loc.nome,
          state: loc.estado,
          country: loc.pais,
          date: loc.data_formatada, // Usando o campo já formatado
          horario: loc.horario_formatado,
          temperature: loc.temperatura
        }));
        setLocations(adaptados);
      })
      .catch(err => console.error('Erro ao atualizar locais:', err));
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Localizações</h1>
        <button className="add-button" onClick={() => setShowModal(true)}>Adicionar Local</button>
      </div>

      <div className="cards-container">
        {locations.map(location => (
          <div key={location.id_Local} className={`location-card1 ${!location.data ? 'invalid' : ''}`}>
            <div className="seila">
              <div className="seladnovo">
              <p style={{ fontWeight: 'bold', color: '#555' }}>
  {location.country || 'País não especificado'}
</p>
<h2>
  {location.state ? `${location.state} - ` : ''}{location.name || 'Local não especificado'}
</h2>
<p>
  {location.date !== '--/--/----' && location.horario !== '--:--'
    ? `${location.date}, ${location.horario.replace(':', 'h')}`
    : 'Data/horário não registrados'}
</p>
              </div>

              <div className="temp">
                <p>{location.temperature}°C</p>
                <div className="temp-icon">
                  {location.temperature > 25 ? '☀️' : location.temperature < 20 ? '🌧️' : '🌤️'}
                </div>
              </div>
            </div>

            <Link 
              to="/" 
              state={{ selectedLocation: location }}
              onClick={() => localStorage.setItem('lastLocation', JSON.stringify(location))}
            >
              DETALHES
            </Link>
          </div>
        ))}
      </div>

      {showModal && <LocationModal onClose={() => setShowModal(false)} onSave={handleAddLocation} />}
    </div>
  );
};

export default Locations;
