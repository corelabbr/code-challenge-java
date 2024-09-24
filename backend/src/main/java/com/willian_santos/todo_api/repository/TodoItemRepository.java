package com.willian_santos.todo_api.repository;

import com.willian_santos.todo_api.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.UUID;


@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, UUID> {
    List<TodoItem> findByFavoriteTrue();
}
