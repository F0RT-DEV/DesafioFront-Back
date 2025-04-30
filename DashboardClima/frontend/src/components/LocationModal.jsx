import React, { useState } from 'react';
import './LocationModal.css';

const LocationModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [temperature, setTemperature] = useState('');

  const handleSubmit = () => {
    if (!name || !date || !time || !temperature) return alert("Preencha todos os campos obrigatórios");
    const lastUpdate = `${date} ${time}`;
    onSave({ name, state, lastUpdate, temperature: Number(temperature) });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Local</h2>

        <div className="card-input">
          <label>Nome *</label>
          <div className="card-field">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Digite o nome do local" />
          </div>
        </div>

        <div className="card-input">
          <label>Estado (opcional)</label>
          <div className="card-field">
            <input value={state} onChange={e => setState(e.target.value)} placeholder="Ex: SP, RJ, MG" />
          </div>
        </div>

        <div className="card-input">
          <label>Data</label>
          <div className="card-field">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
        </div>

        <div className="card-input">
          <label>Hora</label>
          <div className="card-field">
            <input type="time" value={time} onChange={e => setTime(e.target.value)} />
          </div>
        </div>

        <div className="card-input">
          <label>Temperatura (°C)</label>
          <div className="card-field">
            <input type="number" value={temperature} onChange={e => setTemperature(e.target.value)} />
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button className="save" onClick={handleSubmit}>Adicionar</button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;