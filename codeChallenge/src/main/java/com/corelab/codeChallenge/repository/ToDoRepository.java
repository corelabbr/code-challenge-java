package com.corelab.codeChallenge.repository;

import com.corelab.codeChallenge.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    List<ToDo> findByFavoriteTrue();
    List<ToDo> findByColor(String color);

    @Query("SELECT t FROM ToDo t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :text, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :text, '%'))")
    List<ToDo> searchByTitleOrDescription(@Param("text") String text);
}
