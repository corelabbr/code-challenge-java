import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import { deleteNote, updateNote } from '../../services/api';

export default function Card({ id, title, description, color, isFavorite: initialFavorite, updateNotes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [currentColor, setCurrentColor] = useState(color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isColorPickerActive, setIsColorPickerActive] = useState(false);
  
  const colorPickerRef = useRef(null);

  const handleColorPickerClick = () => {
    setShowColorPicker(!showColorPicker);
    setIsColorPickerActive(!isColorPickerActive);
  };

  const handleClickOutside = (event) => {
    if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
      setShowColorPicker(false);
      setIsColorPickerActive(false);
    }
  };

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  const handleDelete = async () => {
    await deleteNote(id);
    updateNotes();
  };

  const handleSave = async (updatedFields = {}) => {
    const updatedData = {
      title: newTitle || title,
      description: newDescription || description,
      color: currentColor || color,
      favorite: isFavorite,
      ...updatedFields,
    };
  
    const sanitizedData = {
      title: updatedData.title,
      description: updatedData.description,
      color: updatedData.color,
      favorite: updatedData.favorite,
    };
  
    try {
      await updateNote(id, sanitizedData);
      setIsEditing(false);
      updateNotes();
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };
  
  const handleCancelEdit = () => setIsEditing(false);

  const handleToggleFavorite = () => {
    setIsFavorite((prevFavorite) => {
      const newFavorite = !prevFavorite;
      handleSave({ favorite: newFavorite });
      return newFavorite;
    });
  };

  const handleColorChange = (newColor) => {
    setCurrentColor(newColor);
    handleSave({ color: newColor });
  };

  return (
    <div className={`card ${currentColor}`}>
      <div className="title-section">
        {isEditing ? (
          <input 
            type="text" 
            className={`note-title ${currentColor}`}
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
          />
        ) : (
          <h3 className="mb-0 note-title">{newTitle}</h3>
        )}

        <button 
          className={`favorite-icon ${isFavorite ? 'favorite' : ''}`} 
          onClick={handleToggleFavorite}
          data-testid="favorite-button"
          aria-label="Marcar como favorita"
        >
          <i className="bi bi-star-fill"></i>
        </button>
      </div>

      <hr className='separator' />

      <div className="card-description">
        {isEditing ? (
          <textarea
            className={`note-content ${currentColor}`}
            value={newDescription} 
            onChange={(e) => setNewDescription(e.target.value)} 
          />
        ) : (
          <p className={`note-content ${currentColor}`}>{newDescription}</p>
        )}
      </div>

      <div className="card-actions">
        {isEditing ? (
          <>
            <button className="btn btn-primary btn-save save" onClick={handleSave} data-testid="save-button">
              <i className="bi bi-check2"></i>
            </button>
            <button className="btn cancel-edit btns-card" onClick={handleCancelEdit} data-testid="cancel-button">
              <i className="bi bi-arrow-return-left"></i>
            </button>
          </>
        ) : (
          <>
            <div className='buttons-editors'>
              <button
                className="btn edit btns-card"
                onClick={() => setIsEditing(true)}
                data-testid="edit-button"
                aria-label="Editar Nota"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn color-picker btns-card"
                onClick={handleColorPickerClick}
                style={{ backgroundColor: isColorPickerActive ? '#FFE3B3' : 'transparent' }}
                data-testid="color-picker-button"
                aria-label="Selecionar cor"
              >
                <i className="bi bi-paint-bucket"></i>
              </button>
            </div>
            <button className="btn delete btns-card" onClick={handleDelete} data-testid="delete-button" aria-label="Deletar Nota">✕</button>
          </>
        )}
      </div>

      {showColorPicker && (
        <div className="color-picker-popup" ref={colorPickerRef}>
          {['light-blue', 'pink', 'yellow', 'green', 'orange', 'gray', 'beige', 'purple'].map(color => (
            <button key={color} className={`color ${color}`} onClick={() => handleColorChange(color)}></button>
          ))}
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  updateNotes: PropTypes.func.isRequired,
};
