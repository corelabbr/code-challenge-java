package com.willian_santos.todo_api.service;

import com.willian_santos.todo_api.model.TodoItem;
import com.willian_santos.todo_api.repository.TodoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TodoService {
    @Autowired
    private TodoItemRepository repository;

    public List<TodoItem> findAll() {
        return repository.findAll();
    }

    public List<TodoItem> findFavorites() {
        return repository.findByFavoriteTrue();
    }

    public TodoItem save(TodoItem todoItem) {
        return repository.save(todoItem);
    }

    public void deleteById(UUID id) {
        repository.deleteById(id);
    }
}
