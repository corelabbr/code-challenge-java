import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './CardSection.scss'

export default function CardSection({ notes, updateNotes }) {

  const favoriteNotes = notes.filter(note => note.favorite);
  const otherNotes = notes.filter(note => !note.favorite);

  return (
    <section className="card-section">
      {
        Array.isArray(favoriteNotes) && favoriteNotes.length > 0 ? (
        <>
          <h2 className="unselect mt-5 mb-5">Favoritas</h2>
          <div className="favorites">
            {favoriteNotes.map(note => (
              <Card
                key={note.id}
                id={note.id}
                title={note.title} 
                description={note.description} 
                color={note.color}
                isFavorite={note.favorite}
                updateNotes={updateNotes}
              />
            ))}
          </div>
        </>
        ) :
        ("")
      }
      {
        Array.isArray(otherNotes) && otherNotes.length > 0 ? (
          <>
            <h2 className="unselect mt-5 mb-5">Outras</h2>
            <div className="others">
              {otherNotes.map(note => (
                <Card
                  key={note.id}
                  id={note.id}
                  title={note.title} 
                  description={note.description} 
                  color={note.color}
                  isFavorite={note.favorite}
                  updateNotes={updateNotes}
                />
              ))}
            </div>
          </>
        ) : (
          ""
        )
      }
    </section>
  );
}

CardSection.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired
  })).isRequired,
  updateNotes: PropTypes.func.isRequired
};