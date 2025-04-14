import React from 'react';
import { AlertTriangle } from "lucide-react";
import './DeleteFoto.css';

const DeleteFoto = ({ photo, onConfirm, onCancel }) => {
  if (!photo) {
    return null; // Se photo for undefined, não renderiza nada
}
    return (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
              <div className="icon-container">
                <AlertTriangle className="alert-icon" />
              </div>
              <h3 className="modal-title">Deleta Foto</h3>
              <p className="modal-text">
              Tem certeza de que deseja excluir "{photo.title}"? Esta ação não pode ser desfeita.
              </p>
              <div className="button-groups">
                <button onClick={onCancel} className="cancel-button">Cancelar</button>
                <button onClick={onConfirm} className="delete-button">Deletar</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default DeleteFoto;
