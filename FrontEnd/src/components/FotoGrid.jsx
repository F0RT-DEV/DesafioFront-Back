import React from "react";
import "./FotoGrid.css"; // Importando o arquivo CSS

const FotoGrid = ({ photos, onEdit, onDelete, onView }) => {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-item">
          <img
            src={photo.url}
            alt={photo.title}
            className="photo-image"
            onClick={() => onView(photo)}
          />
          <div className="photo-overlay">
            <button onClick={() => onEdit(photo)} className="edit-button">
              Editar
            </button>
            <button onClick={() => onDelete(photo)} className="delete-button">
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FotoGrid;
