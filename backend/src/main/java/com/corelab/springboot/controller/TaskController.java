package com.corelab.springboot.controller;

import com.corelab.springboot.domain.Task;
import com.corelab.springboot.dto.TaskListDTO;
import com.corelab.springboot.dto.TaskRequestDTO;
import com.corelab.springboot.service.TaskService;
import com.corelab.springboot.util.DateUtil;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("task")
@Log4j2
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final DateUtil dateUtil;

    @GetMapping
    public ResponseEntity<Page<TaskListDTO>> list(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String detail,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) Boolean favorite,
            @RequestParam(value = "dateInitial", required = false) Long dateInitial,
            @RequestParam(value = "dateFinal", required = false) Long dateFinal,
            @ParameterObject Pageable pageable) {

        return ResponseEntity.ok(taskService.listAll(userId, title, detail, color, favorite, dateUtil.getDate(dateInitial), dateUtil.getDate(dateFinal), pageable));
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<TaskListDTO>> listAll() {
        return ResponseEntity.ok(taskService.listAllNonPageable());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Task> findById(@PathVariable long id) {
        return ResponseEntity.ok(taskService.findByIdDTOOrThrowBadRequestException(id));
    }

    @GetMapping(path = "by-id/{id}")
    public ResponseEntity<Task> findByIdAuthenticationPrincipal(@PathVariable long id,
                                                                @AuthenticationPrincipal UserDetails userDetails) {
        log.info(userDetails);
        return ResponseEntity.ok(taskService.findByIdOrThrowBadRequestException(id));
    }

    @PostMapping
    public ResponseEntity<Task> save(@RequestBody @Valid TaskRequestDTO teamPostRequestBody) {
        return new ResponseEntity<>(taskService.save(teamPostRequestBody), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successful Operation"),
            @ApiResponse(responseCode = "400", description = "When Task Does Not Exist in The Database")
    })
    public ResponseEntity<Void> delete(@PathVariable long id) {
        taskService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Void> replace(@PathVariable Long id, @RequestBody TaskRequestDTO taskPutRequestBody) {
        if(id != null) {
            taskPutRequestBody.setId(id);
        }
        taskService.update(taskPutRequestBody);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
