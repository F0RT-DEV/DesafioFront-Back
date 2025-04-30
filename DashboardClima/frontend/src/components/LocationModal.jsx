// LocationModal.js
import React, { useState } from 'react';
import './LocationModal.css';

const LocationModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    date: '',
    temperature: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.state || !formData.date || formData.temperature === '') {
      alert('Preencha todos os campos');
      return;
    }

    // Converter temperatura para número
    const newLocation = {
      ...formData,
      temperature: parseFloat(formData.temperature)
    };

    onSave(newLocation);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Adicionar Local</h2>
        
        <label>Nome da Cidade:</label>
        <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Estado (sigla):</label>
        <input 
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />

        <label>Data e Hora:</label>
        <input 
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label>Temperatura (°C):</label>
        <input 
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
        />

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
