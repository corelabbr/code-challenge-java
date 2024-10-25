package com.corelabtest.controller;

import com.corelabtest.model.Note;
import com.corelabtest.repository.NoteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class NoteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createNote_ShouldReturnCreatedNote() throws Exception {
        Note note = new Note("Title", "Description", "#ffffff", false);

        mockMvc.perform(post("/api/notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(note)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title", is(note.getTitle())))
                .andExpect(jsonPath("$.description", is(note.getDescription())));
    }

    @Test
    void getAllNotes_ShouldReturnNotesSeparatedByFavoriteStatus() throws Exception {
        Note favoriteNote = new Note("Favorite Note", "Description", "#ffffff", true);
        Note regularNote = new Note("Regular Note", "Description", "#ffffff", false);
        noteRepository.save(favoriteNote);
        noteRepository.save(regularNote);

        mockMvc.perform(get("/api/notes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.favoriteNotes", hasSize(1)))
                .andExpect(jsonPath("$.otherNotes", hasSize(1)));
    }

    @Test
    void toggleFavoriteStatus_ShouldToggleFavoriteAttribute() throws Exception {
        Note note = new Note("Title", "Description", "#ffffff", false);
        note = noteRepository.save(note);

        mockMvc.perform(patch("/api/notes/" + note.getId() + "/favorite"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isFavorite", is(true)));

        Optional<Note> updatedNote = noteRepository.findById(note.getId());
        assertTrue(updatedNote.isPresent());
        assertTrue(updatedNote.get().getIsFavorite());
    }
}
