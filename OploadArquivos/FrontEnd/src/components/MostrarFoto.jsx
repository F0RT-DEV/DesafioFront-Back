import React from 'react';
import { X } from 'lucide-react';
import './MostrarFoto.css';

const MostrarFoto = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Detalhes da Foto</h2>
          <button onClick={onClose} className="close-button">
            <X className="icon" />
          </button>
        </div>
        <div className="form-container">
          <img 
            src={`http://localhost:3000/public/${photo.caminho}`}
            alt={photo.title}
            className="preview-image"
          />
          <div className="input-group">
            <label>Título</label>
            <p>{photo.title}</p>
          </div>
          <div className="input-group">
            <label>Descrição</label>
            <p>{photo.alternativo || 'Sem descrição'}</p>
          </div>
          <div className="button-group">
            <button onClick={onClose} className="cancel-button">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostrarFoto;
