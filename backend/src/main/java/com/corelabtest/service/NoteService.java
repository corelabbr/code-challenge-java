package com.corelabtest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.corelabtest.model.Note;
import com.corelabtest.repository.NoteRepository;
import com.corelabtest.utils.NoteResponse;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note createNote(Note note) {
        return this.noteRepository.save(note);
    }

    public NoteResponse getNotes() {
        List<Note> favoriteNotes = this.noteRepository.findByIsFavoriteTrue();
        List<Note> otherNotes = this.noteRepository.findByIsFavoriteFalse();
        
        return new NoteResponse(favoriteNotes, otherNotes);
    }
    
    public NoteResponse searchNotes(String search) {
        List<Note> allNotes;
        
        if (search == null || search.trim().isEmpty()) allNotes = this.noteRepository.findAll();
        else allNotes = this.noteRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search);

        List<Note> favoriteNotes = allNotes.stream()
            .filter(Note::getIsFavorite)
            .collect(Collectors.toList());

        List<Note> nonFavoriteNotes = allNotes.stream()
            .filter(note -> !note.getIsFavorite())
            .collect(Collectors.toList());

        return new NoteResponse(favoriteNotes, nonFavoriteNotes);
    }

    public Note toggleFavorite(Long id) {
        Note note = this.getNoteById(id);
        note.setIsFavorite(!note.getIsFavorite()); 
        return this.updateNote(id, note);
    }

    public Note getNoteById(Long id) {
        Optional<Note> note = this.noteRepository.findById(id);
        return note.orElseThrow(() -> new RuntimeException("Nota não encontrada!"));
    }

    public Note updateNote(Long id, Note noteDetails) {
        Note note = this.getNoteById(id);

        note.setTitle(noteDetails.getTitle());
        note.setDescription(noteDetails.getDescription());
        note.setIsFavorite(noteDetails.getIsFavorite());
        note.setColor(noteDetails.getColor());

        return this.noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        Note note = this.getNoteById(id);
        this.noteRepository.delete(note);
    }
}
