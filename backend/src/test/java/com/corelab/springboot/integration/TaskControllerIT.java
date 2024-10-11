package com.corelab.springboot.integration;

import com.corelab.springboot.domain.Task;
import com.corelab.springboot.domain.User;
import com.corelab.springboot.dto.TaskListDTO;
import com.corelab.springboot.dto.TaskRequestDTO;
import com.corelab.springboot.dto.UserRequestDTO;
import com.corelab.springboot.exception.BadRequestException;
import com.corelab.springboot.repository.TaskRepository;
import com.corelab.springboot.repository.UserRepository;
import com.corelab.springboot.security.JWTUtil;
import com.corelab.springboot.util.TaskCreator;
import com.corelab.springboot.util.UserCreator;
import com.corelab.springboot.wrapper.PageableResponse;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.util.HashSet;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class TaskControllerIT {
    @Autowired
    private JWTUtil jwtTokenService;

    @Autowired
    @Qualifier("testRestTemplateWithRoles")
    private TestRestTemplate testRestTemplateWithRoles;

    @Autowired
    @Qualifier("testRestTemplateWithoutRoles")
    private TestRestTemplate testRestTemplateWithoutRoles;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder pe;

    @Autowired
    private ModelMapper modelMapper;

    @LocalServerPort
    private String port;

    @BeforeEach
    public void setup() {
        User user = UserCreator.createUserToBeUser(pe);
        userRepository.saveAndFlush(user);
        userRepository.saveAndFlush(UserCreator.createUserWithoutPermission(pe));
        testRestTemplateWithRoles.getRestTemplate().setUriTemplateHandler(new DefaultUriBuilderFactory("http://localhost:" + port));
        testRestTemplateWithoutRoles.getRestTemplate().setUriTemplateHandler(new DefaultUriBuilderFactory("http://localhost:" + port));
    }

    @Test
    @DisplayName("list returns list of task inside page object when successful")
    void list_ReturnsListOfTasksInsidePageObject_WhenSuccessful() {
        User user = new User(1L);
        Task savedTask = taskRepository.save(TaskCreator.createTaskToBeSaved(user));

        String expectedName = savedTask.getTitle();

        PageableResponse<TaskListDTO> taskPage = testRestTemplateWithRoles.exchange("/task", HttpMethod.GET, null,
                new ParameterizedTypeReference<PageableResponse<TaskListDTO>>() {
                }).getBody();

        Assertions.assertThat(taskPage).isNotNull();

        Assertions.assertThat(taskPage.toList())
                .isNotEmpty()
                .hasSize(5);

        Assertions.assertThat(taskPage.toList().get(0).getTitle()).isEqualTo(expectedName);
    }

    @Test
    @DisplayName("listAll returns list of task when successful")
    void listAll_ReturnsListOfTasks_WhenSuccessful() {
        User user = new User(1L);
        Task savedTask = taskRepository.save(TaskCreator.createTaskToBeSaved(user));

        String expectedName = savedTask.getTitle();

        List<TaskListDTO> task = testRestTemplateWithRoles.exchange("/task/all", HttpMethod.GET, null,
                new ParameterizedTypeReference<List<TaskListDTO>>() {
                }).getBody();

        Assertions.assertThat(task)
                .isNotNull()
                .isNotEmpty()
                .hasSize(21);

        Assertions.assertThat(task.get(0).getTitle()).isEqualTo(expectedName);
    }

    @Test
    @DisplayName("findById returns task when successful")
    void findById_ReturnsTask_WhenSuccessful() {
        User user = new User(1L);
        Task savedTask = taskRepository.save(TaskCreator.createTaskToBeSaved(user));

        Long expectedId = savedTask.getId();

        Task task = testRestTemplateWithRoles.getForObject("/task/{id}", Task.class, expectedId);

        Assertions.assertThat(task).isNotNull();

        Assertions.assertThat(task.getId()).isNotNull().isEqualTo(expectedId);
    }

    @Test
    @DisplayName("save returns task when successful")
    void save_ReturnsTask_WhenSuccessful() {
        User user = userRepository.findById(1L).orElseThrow(() -> new BadRequestException("User not Found"));

        Task taskPostRequestBody = TaskCreator.createTaskToBeSaved(user);
        taskPostRequestBody.setUser(null);
        taskPostRequestBody.setId(null);
        TaskRequestDTO taskRequestDTO = modelMapper.map(taskPostRequestBody, TaskRequestDTO.class);

        ResponseEntity<TaskRequestDTO> taskResponseEntity = testRestTemplateWithRoles.postForEntity("/task", taskRequestDTO, TaskRequestDTO.class);

        Assertions.assertThat(taskResponseEntity).isNotNull();
        Assertions.assertThat(taskResponseEntity.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Assertions.assertThat(taskResponseEntity.getBody()).isNotNull();
        Assertions.assertThat(taskResponseEntity.getBody().getId()).isNotNull();

    }

    @Test
    @DisplayName("replace updates task when successful")
    void replace_UpdatesTask_WhenSuccessful() {
        User user = new User(1L);
        Task savedTask = taskRepository.save(TaskCreator.createTaskToBeSaved(user));

        Task updatedTask = TaskCreator.createTaskToBeUpdated();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Task> requestEntity = new HttpEntity<>(updatedTask, headers);
        ResponseEntity<Void> taskResponseEntity = testRestTemplateWithRoles.exchange("/task/{id}",
                HttpMethod.PUT, requestEntity, Void.class, savedTask.getId());

        Task task = taskRepository.findById(savedTask.getId())
                .orElseThrow(() -> new BadRequestException("Task not Found"));;

        Assertions.assertThat(task.getTitle()).isEqualTo(savedTask.getTitle());
        Assertions.assertThat(taskResponseEntity).isNotNull();

        Assertions.assertThat(taskResponseEntity.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    @DisplayName("delete removes task when successful")
    void delete_RemovesTask_WhenSuccessful() {
        User user = new User(1L);
        Task savedTask = taskRepository.save(TaskCreator.createTaskToBeSaved(user));

        ResponseEntity<Void> taskResponseEntity = testRestTemplateWithRoles.exchange("/task/{id}",
                HttpMethod.DELETE, null, Void.class, savedTask.getId());

        Assertions.assertThat(taskResponseEntity).isNotNull();

        Assertions.assertThat(taskResponseEntity.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }
    @Test
    @DisplayName("delete returns 403 when task is not admin")
    void delete_Returns403_WhenTaskIsNotAdmin() {
        User user = userRepository.findById(2L).orElseThrow(() -> new BadRequestException("User not Found"));
        user.setTasks(new HashSet<>());

        UserRequestDTO userRequestDTO = modelMapper.map(user, UserRequestDTO.class);
        userRequestDTO.setAuthorities("1,2,3");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserRequestDTO> requestEntity = new HttpEntity<>(userRequestDTO, headers);
        testRestTemplateWithRoles.exchange("/user/{id}",
                HttpMethod.PUT, requestEntity, Void.class, user.getId());

        Task savedTask = taskRepository.save(TaskCreator.createTaskToBeSaved(user));

        ResponseEntity<Void> taskResponseEntity = testRestTemplateWithoutRoles.exchange("/task/{id}",
                HttpMethod.DELETE, null, Void.class, savedTask.getId());

        Assertions.assertThat(taskResponseEntity).isNotNull();

        Assertions.assertThat(taskResponseEntity.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

}
