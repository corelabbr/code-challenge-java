package com.corelab.springboot.service;

import com.corelab.springboot.domain.Task;
import com.corelab.springboot.domain.User;
import com.corelab.springboot.dto.TaskListDTO;
import com.corelab.springboot.dto.TaskRequestDTO;
import com.corelab.springboot.dto.UserListDTO;
import com.corelab.springboot.exception.BadRequestException;
import com.corelab.springboot.repository.TaskRepository;
import com.corelab.springboot.security.UserSS;
import com.corelab.springboot.specification.TaskSpecification;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;

    public Page<TaskListDTO> listAll(Long userId, String title, String detail, String color, Boolean favorite, Date startDate, Date endDate, Pageable pageable) {
        Specification<Task> spec = TaskSpecification.filterByParams(userId, title, detail, color, favorite, startDate, endDate);
        Page<Task> tasks = taskRepository.findAll(spec, pageable);
        return tasks.map(task -> modelMapper.map(task, TaskListDTO.class));
    }

    public List<TaskListDTO> listAllNonPageable() {
        return taskRepository.findAll().stream().map(obj -> modelMapper.map(obj, TaskListDTO.class)).collect(Collectors.toList());
    }

    public Task findByIdOrThrowBadRequestException(long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Task not Found"));
    }

    public Task findByIdDTOOrThrowBadRequestException(long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Task not Found"));
        return modelMapper.map(modelMapper.map(task, TaskListDTO.class), Task.class);
    }

    @Transactional
    public Task save(TaskRequestDTO taskDTO) {
        Task task = modelMapper.map(taskDTO, Task.class);
        if(task.getUser() == null) {
            final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSS user = ((UserSS) authentication.getPrincipal());
            task.setUser(new User(user.getId()));
        }
        if(task.getColor() == null) {
            task.setColor("#FFF");
        }
        return taskRepository.save(task);
    }

    public void delete(long id) {
        taskRepository.delete(findByIdOrThrowBadRequestException(id));
    }

    public void update(TaskRequestDTO taskDTO) {
        Task task = modelMapper.map(taskDTO, Task.class);
        Task savedTask = findByIdOrThrowBadRequestException(task.getId());
        task.setId(savedTask.getId());
        if (task.getTitle() == null) {
            task.setTitle(savedTask.getTitle());
        }
        if (task.getDetail() == null) {
            task.setDetail(savedTask.getDetail());
        }
        if (task.getColor() == null) {
            task.setColor(savedTask.getColor());
        }
        if (task.getUser() == null) {
            task.setUser(savedTask.getUser());
        }
        if (task.getFavorite() == null) {
            task.setFavorite(savedTask.getFavorite());
        }
        if (task.getDate() == null) {
            task.setDate(savedTask.getDate());
        }
        taskRepository.save(task);
    }
}
