import React from "react";
import "./FotoGrid.css";

const FotoGrid = ({ photos, onEdit, onDelete, onView }) => {
  return (
    <div className="photo-grid">
     {photos.map((photo, index) => (
  <div key={`${photo.caminho}-${index}`} className="photo-item">

          <img
            src={`http://localhost:3000/public/${photo.caminho}`}
            alt={photo.title}
            className="photo-image"
            onClick={() => onView(photo)}
            
          />
          <div className="photo-overlay">
          <button onClick={() => onView(photo)} className="show-button">
              Mostrar
            </button>
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

