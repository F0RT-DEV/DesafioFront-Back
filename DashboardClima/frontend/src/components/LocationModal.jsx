import React, { useState } from 'react';
import './LocationModal.css';
import axios from 'axios';

const LocationModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    country: '',
    date: '',
    temperature: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async () => {
    const { name, state, country, date, temperature } = formData;
    const paísNormalizado = country.replace(/['"]/g, "");
  
    if (!name || !state || !country || !date || temperature === '') {
      alert('Preencha todos os campos');
      return;
    }
  
    const [data, horario] = date.split('T');
    if (!data || !horario) {
      alert("Data e hora inválidas.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/locais', {
        nome: name,
        estado: state,
        pais: paísNormalizado,
        data,
        horario,
        temperatura: parseFloat(temperature)
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 201) {
        alert('Local cadastrado com sucesso!');
        onSave(); // Isso agora vai atualizar a lista
        onClose();
      } else {
        alert(response.data.mensagem || 'Erro ao cadastrar');
      }
    } catch (error) {
      console.error("Erro no frontend:", error);
      alert(error.response?.data?.message || 'Erro de conexão com o servidor');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Adicionar Local</h2>

        <label>Nome da Cidade:</label>
        <input name="name" value={formData.name} onChange={handleChange} />

        <label>Estado:</label>
        <input name="state" value={formData.state} onChange={handleChange} />

        <label>País:</label>
        <input name="country" value={formData.country} onChange={handleChange} />

        <label>Data e Hora:</label>
        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} />

        <label>Temperatura (°C):</label>
        <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} />

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;