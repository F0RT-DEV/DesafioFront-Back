import React, { useState } from 'react';
import { X } from 'lucide-react';
import './AtualizarFoto.css';

const AtualizarFoto = ({ photo, onSave, onClose }) => {
  const [title, setTitle] = useState(photo?.title || '');
  const [description, setDescription] = useState(photo?.description || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onSave) return;

    await onSave({
      ...photo,
      title,
      description: description.trim() || undefined,
    });

    if (onClose) onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Photo</h2>
          <button onClick={onClose} className="close-button">
            <X className="icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {photo?.url && (
            <img
              src={photo.url}
              alt={title || 'Photo preview'}
              className="photo-preview"
            />
          )}

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AtualizarFoto;


