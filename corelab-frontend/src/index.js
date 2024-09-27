import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from './components/Header/Header';
import NoteInput from './components/NoteInput/NoteInput';
import CardSection from './components/CardSection/CardSection';
import { searchNotes, fetchNotes } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = createRoot(document.getElementById('root'));

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadNotes() {
      const allNotes = await fetchNotes();
      setNotes(allNotes);
      setFilteredNotes(allNotes);
    }
    loadNotes();
  }, []);

  useEffect(() => {
    const filterNotes = async () => {
      if (searchTerm.trim() === '') {
        setFilteredNotes(notes);
      } else {
        const result = await searchNotes(searchTerm);
        setFilteredNotes(result);
      }
    };
    filterNotes();
  }, [searchTerm, notes]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const updateNotes = async () => {
    const allNotes = await fetchNotes();
    setNotes(allNotes);
    setFilteredNotes(allNotes);
  };

  return (
    <React.StrictMode>
      <Header onSearch={handleSearch} />
      <NoteInput updateNotes={updateNotes} />
      <CardSection notes={filteredNotes} updateNotes={updateNotes} />
    </React.StrictMode>
  );
}

root.render(<App />);
