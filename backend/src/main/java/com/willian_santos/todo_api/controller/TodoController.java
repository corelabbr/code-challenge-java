package com.willian_santos.todo_api.controller;

import com.willian_santos.todo_api.exception.ResourceNotFoundException;
import com.willian_santos.todo_api.model.ApiResponse;
import com.willian_santos.todo_api.model.TodoItem;
import com.willian_santos.todo_api.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
    
    @Autowired
    private TodoService todoService;

    /**
     * Retrieves all todos from the database.
     * @return An ApiResponse containing all the TodoItems in the database.
     */
    @GetMapping
    public ApiResponse<List<TodoItem>> getAllTodos() {
        List<TodoItem> todos = todoService.findAll();
        return new ApiResponse<>("Todos retrieved successfully", todos);
    }

    /**
     * Retrieves all favorite todos from the database.
     * @return An ApiResponse containing all the favorite TodoItems in the database.
     */
    @GetMapping("/favorites")
    public ApiResponse<List<TodoItem>> getFavoriteTodos() {
        List<TodoItem> favoriteTodos = todoService.findFavorites();
        return new ApiResponse<>("Favorite todos retrieved successfully", favoriteTodos);
    }

    /**
     * Creates a new Todo item in the database.
     * @param todoItem The new Todo item to be created.
     * @return An ApiResponse containing the newly created Todo item.
     */
    @PostMapping
    public ApiResponse<TodoItem> createTodo(@Valid @RequestBody TodoItem todoItem) {
        TodoItem createdTodo = todoService.save(todoItem);
        return new ApiResponse<>("Todo item created successfully", createdTodo);
    }

    /**
     * Updates an existing Todo item in the database.
     * @param id The id of the Todo item to be updated.
     * @param todoItem The updated Todo item to be saved.
     * @return An ApiResponse containing the updated Todo item.
     */
    @PutMapping("/{id}")
    public ApiResponse<TodoItem> updateTodo(@PathVariable UUID id, @Valid @RequestBody TodoItem todoItem) {
        todoItem.setId(id);
        TodoItem updatedTodo = todoService.save(todoItem);
        return new ApiResponse<>("Todo item updated successfully", updatedTodo);
    }

    /**
     * Deletes a Todo item from the database.
     * @param id The id of the Todo item to be deleted.
     * @return A ResponseEntity containing an ApiResponse with a success message.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTodo(@PathVariable UUID id) {
        todoService.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>("Todo item deleted successfully", null));
    }
}
