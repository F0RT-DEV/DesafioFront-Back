import React from "react";
import "./FotoGrid.css";

const FotoGrid = ({ photos, onEdit, onDelete, onView }) => {
  return (
    <div className="photo-grid">
     {photos.map((photo, index) => (
  <div key={`${photo.id}-${index}`} className="photo-item">

          <img
            src={`http://localhost:3000/public/img/${photo.id}`}
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

