package com.corelab.codeChallenge;

import com.corelab.codeChallenge.controller.ToDoController;
import com.corelab.codeChallenge.model.ToDo;
import com.corelab.codeChallenge.services.ToDoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
class CodeChallengeApplicationTests {

	private MockMvc mockMvc;

	@Mock
	private ToDoService toDoService;

	@InjectMocks
	private ToDoController toDoController;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(toDoController).build();
	}

	@Test
	void testGetAllToDos() throws Exception {
		ToDo todo1 = new ToDo(1L, "Title1", "Description1", false, "red");
		ToDo todo2 = new ToDo(2L, "Title2", "Description2", true, "blue");
		when(toDoService.getAllToDos()).thenReturn(Arrays.asList(todo1, todo2));

		mockMvc.perform(get("/api/ToDos"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].title").value("Title1"))
				.andExpect(jsonPath("$[1].title").value("Title2"));
	}

	@Test
	void testGetToDoById() throws Exception {
		ToDo todo = new ToDo(1L, "Title1", "Description1", false, "red");
		when(toDoService.getToDoById(anyLong())).thenReturn(todo);

		mockMvc.perform(get("/api/ToDos/1"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.title").value("Title1"));
	}

	@Test
	void testCreateToDo() throws Exception {
		ToDo todo = new ToDo(null, "Title1", "Description1", false, "red");
		ToDo savedToDo = new ToDo(1L, "Title1", "Description1", false, "red");
		when(toDoService.createToDo(any())).thenReturn(savedToDo);

		mockMvc.perform(post("/api/ToDos")
						.contentType(MediaType.APPLICATION_JSON)
						.content(new ObjectMapper().writeValueAsString(todo)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1));
	}

	@Test
	void testUpdateToDo() throws Exception {
		ToDo updatedToDo = new ToDo(1L, "Updated Title", "Updated Description", true, "green");
		when(toDoService.updateToDo(anyLong(), any(ToDo.class))).thenReturn(updatedToDo);

		mockMvc.perform(put("/api/ToDos/1")
						.contentType(MediaType.APPLICATION_JSON)
						.content(new ObjectMapper().writeValueAsString(updatedToDo)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.title").value("Updated Title"));
	}

	@Test
	void testDeleteToDo() throws Exception {
		mockMvc.perform(delete("/api/ToDos/1"))
				.andExpect(status().isNoContent());

		verify(toDoService, times(1)).deleteToDoById(1L);
	}
}
