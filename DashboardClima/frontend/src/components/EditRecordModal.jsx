import React from 'react';
import { X } from 'lucide-react';
import './EditRecordModal.css'; 

const EditRecordModal = ({ isOpen, onClose, record, onSave }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Editar Registro</h2>
          <button 
            className="btn-icon"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="form-group">
          <label className="form-label">Local</label>
          <input 
            type="text" 
            className="form-input"
            defaultValue={record?.locationName} 
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Data</label>
            <input 
              type="date" 
              className="form-input"
              defaultValue={record?.date} 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Hora</label>
            <input 
              type="time" 
              className="form-input"
              defaultValue={record?.time} 
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Temperatura (°C)</label>
          <input 
            type="number" 
            className="form-input"
            defaultValue={record?.temperature} 
          />
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="btn btn-primary"
            onClick={onSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecordModal;