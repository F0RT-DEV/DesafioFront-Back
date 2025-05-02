import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import './EditRecordModal.css';

const EditRecordModal = ({ isOpen, onClose, record, onSave }) => {
  const [editedRecord, setEditedRecord] = useState(record);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedRecord);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Editar Registro</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Local:</label>
            <input
              type="text"
              name="locationName"
              value={editedRecord.locationName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
    <label>Estado:</label>
    <input
      type="text"
      name="state"
      value={editedRecord.state || ''}
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
  <label>Data:</label>
  <input
    type="date"
    name="date"
    value={editedRecord.date}
    onChange={handleChange}
    required
  />
</div>
          
          <div className="form-group">
            <label>Hora:</label>
            <input
              type="text"
              name="time"
              value={editedRecord.time}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Temperatura (°C):</label>
            <input
              type="number"
              name="temperature"
              value={editedRecord.temperature}
              onChange={handleChange}
              step="0.1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>País:</label>
            <input
              type="text"
              name="country"
              value={editedRecord.country}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              <Save size={16} /> Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecordModal;
