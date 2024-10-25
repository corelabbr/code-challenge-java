package com.corelabtest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.corelabtest.model.Note;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByIsFavoriteTrue();
    List<Note> findByIsFavoriteFalse();
    List<Note> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
}
