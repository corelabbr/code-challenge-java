package com.corelabtest.utils;

import java.util.List;

import com.corelabtest.model.Note;

public class NoteResponse {
    private List<Note> favoriteNotes;
    private List<Note> otherNotes;

    public NoteResponse(List<Note> favoriteNotes, List<Note> otherNotes) {
        this.favoriteNotes = favoriteNotes;
        this.otherNotes = otherNotes;
    }

    public List<Note> getFavoriteNotes() {
        return favoriteNotes;
    }

    public void setFavoriteNotes(List<Note> favoriteNotes) {
        this.favoriteNotes = favoriteNotes;
    }

    public List<Note> getOtherNotes() {
        return otherNotes;
    }

    public void setOtherNotes(List<Note> otherNotes) {
        this.otherNotes = otherNotes;
    }
}
