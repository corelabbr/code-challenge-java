package com.corelab.codeChallenge.services;

import com.corelab.codeChallenge.model.ToDo;
import com.corelab.codeChallenge.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository ToDoRepository;

    public List<ToDo> getAllToDos() {
        return ToDoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public ToDo getToDoById(Long id) {
        return ToDoRepository.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found"));
    }

    public ToDo createToDo(ToDo ToDo) {
        return ToDoRepository.save(ToDo);
    }

    public ToDo updateToDo(Long id, ToDo updatedToDo) {
        ToDo existingToDo = getToDoById(id);
        existingToDo.setTitle(updatedToDo.getTitle());
        existingToDo.setDescription(updatedToDo.getDescription());
        existingToDo.setFavorite(updatedToDo.isFavorite());
        existingToDo.setColor(updatedToDo.getColor());
        return ToDoRepository.save(existingToDo);
    }

    public void deleteToDoById(Long id) {
        ToDoRepository.deleteById(id);
    }

    public List<ToDo> getFavoriteToDos() {
        return ToDoRepository.findByFavoriteTrue();
    }

    public List<ToDo> getToDosByColor(String color) {
        return ToDoRepository.findByColor(color);
    }

    public List<ToDo> searchToDosByText(String text) {
        return ToDoRepository.searchByTitleOrDescription(text);
    }
}
