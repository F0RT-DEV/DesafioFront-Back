import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './EditRecordModal.css'; 

const EditRecordModal = ({ isOpen, onClose, record, onSave }) => {
  const [formData, setFormData] = useState({
    locationName: '',
    date: '',
    time: '',
    temperature: ''
  });

  useEffect(() => {
    if (record) {
      setFormData({
        locationName: record.locationName,
        date: record.date,
        time: record.time,
        temperature: record.temperature
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...record, ...formData });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Editar Registro</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Local</label>
          <input 
            type="text" 
            className="form-input"
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Data</label>
            <input 
              type="date" 
              className="form-input"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Hora</label>
            <input 
              type="time" 
              className="form-input"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Temperatura (°C)</label>
          <input 
            type="number" 
            className="form-input"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecordModal;
