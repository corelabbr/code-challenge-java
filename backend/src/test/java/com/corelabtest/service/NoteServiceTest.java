package com.corelabtest.service;

import com.corelabtest.model.Note;
import com.corelabtest.repository.NoteRepository;
import com.corelabtest.utils.NoteResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NoteServiceTest {

    @Mock
    private NoteRepository noteRepository;

    @InjectMocks
    private NoteService noteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createNote_ShouldReturnCreatedNote() {
        Note note = new Note("Title", "Description", "#ffffff", false);
        when(noteRepository.save(any(Note.class))).thenReturn(note);

        Note createdNote = noteService.createNote(note);

        assertEquals(note, createdNote);
        verify(noteRepository, times(1)).save(note);
    }

    @Test
    void getNotes_ShouldReturnAllNotesSeparatedByFavorites() {
        Note favoriteNote = new Note("Favorite Note", "Description", "#ffffff", true);
        Note regularNote = new Note("Regular Note", "Description", "#ffffff", false);
        when(noteRepository.findByIsFavoriteTrue()).thenReturn(List.of(favoriteNote));
        when(noteRepository.findByIsFavoriteFalse()).thenReturn(List.of(regularNote));

        NoteResponse notes = noteService.getNotes();

        assertEquals(1, notes.getFavoriteNotes().size());
        assertEquals(1, notes.getOtherNotes().size());
    }

    @Test
    void toggleFavoriteStatus_ShouldToggleFavoriteStatus() {
        Note note = new Note("Title", "Description", "#ffffff", false);
        note.setId(1L);
        when(noteRepository.findById(1L)).thenReturn(Optional.of(note));
        when(noteRepository.save(note)).thenReturn(note);

        Note toggledNote = noteService.toggleFavorite(1L);

        assertTrue(toggledNote.getIsFavorite());
        verify(noteRepository, times(1)).save(note);
    }
}
