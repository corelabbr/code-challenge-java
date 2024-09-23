import React, { useState } from 'react';
import './NoteInput.scss';
import { createNote } from '../../services/api';
import PropTypes from 'prop-types';

export default function NoteInput({updateNotes}) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCreate = async () => {
    const noteData = {
      title: noteTitle,
      description: noteContent,
      favorite: isFavorite,
      color: 'white'
    };
    
    await createNote(noteData);

    setNoteTitle('');
    setNoteContent('');
    setIsFavorite(false);
    updateNotes();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="note-input-container">
      <div className="note-box">
        <div className="title-section">
          <input
            type="text"
            className="note-title create-note-title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Título"
          />
          <button className={`favorite-icon ${isFavorite ? 'favorite' : ''}`} onClick={toggleFavorite}>
            <i className="bi bi-star-fill"></i>
          </button>
        </div>
        <hr className="separator" />
        <textarea
          className="note-content create-note-content"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Criar nota..."
        />
      </div>
      {
        noteTitle && noteContent !== "" ? 
        <button className="btn btn-primary btn-save" onClick={handleCreate}>
          Salvar
        </button>
        :
        ""
      }
    </div>
  );
}

NoteInput.propTypes = {
  updateNotes: PropTypes.func.isRequired,
}