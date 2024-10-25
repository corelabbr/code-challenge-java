package com.corelabtest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.corelabtest.model.Note;
import com.corelabtest.service.NoteService;
import com.corelabtest.utils.NoteResponse;

@Controller
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public ResponseEntity<Note> createTask(@RequestBody Note note) {
        Note createdNote = this.noteService.createNote(note);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<NoteResponse> getAllNotes(
        @RequestParam(required = false) Boolean isFavorite,
        @RequestParam(required = false) String color,
        @RequestParam(required = false) String search
    ) {
        if (search != null) {
            NoteResponse filteredNotes = this.noteService.searchNotes(search);
            return new ResponseEntity<>(filteredNotes, HttpStatus.OK);
        }

        NoteResponse notes = this.noteService.getNotes();
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Note note = this.noteService.getNoteById(id);
        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        Note updatedNote = this.noteService.updateNote(id, note);
        return new ResponseEntity<>(updatedNote, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        this.noteService.deleteNote(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}/favorite")
    public ResponseEntity<Note> toggleFavorite(@PathVariable Long id) {
        Note note = this.noteService.toggleFavorite(id);
        return new ResponseEntity<>(note, HttpStatus.OK);
    }
}
