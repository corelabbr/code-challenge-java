package com.corelab.codeChallenge.controller;

import com.corelab.codeChallenge.model.ToDo;
import com.corelab.codeChallenge.services.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/ToDos", produces = MediaType.APPLICATION_JSON_VALUE)
public class ToDoController {

    @Autowired
    private ToDoService ToDoService;

    @GetMapping
    public List<ToDo> getAllToDos() {
        return ToDoService.getAllToDos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getToDoById(@PathVariable Long id) {
        ToDo ToDo = ToDoService.getToDoById(id);
        return ResponseEntity.ok(ToDo);
    }

    @PostMapping
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo ToDo) {
        ToDo newToDo = ToDoService.createToDo(ToDo);
        return ResponseEntity.ok(newToDo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateToDo(@PathVariable Long id, @RequestBody ToDo ToDo) {
        ToDo updatedToDo = ToDoService.updateToDo(id, ToDo);
        return ResponseEntity.ok(updatedToDo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToDoById(@PathVariable Long id) {
        ToDoService.deleteToDoById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/favorites")
    public List<ToDo> getFavoriteToDos() {
        return ToDoService.getFavoriteToDos();
    }

    @GetMapping("/color/{color}")
    public List<ToDo> getToDosByColor(@PathVariable String color) {
        return ToDoService.getToDosByColor(color);
    }

    @GetMapping("/search")
    public List<ToDo> searchToDos(@RequestParam String query) {
        return ToDoService.searchToDosByText(query);
    }
}
