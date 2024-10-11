package com.corelab.springboot.controller;

import com.corelab.springboot.domain.User;
import com.corelab.springboot.dto.UserListDTO;
import com.corelab.springboot.dto.UserRequestDTO;
import com.corelab.springboot.service.UserService;
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
import java.util.List;

@RestController
@RequestMapping("user")
@Log4j2
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserListDTO>> list(@RequestParam(required = false) String name,
                                                  @RequestParam(required = false) String username,
                                                  @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(userService.listAll(name, username, pageable));
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<UserListDTO>> listAll() {
        return ResponseEntity.ok(userService.listAllNonPageable());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserListDTO> findById(@PathVariable long id) {
        return ResponseEntity.ok(userService.findByIdDTOOrThrowBadRequestException(id));
    }

    @GetMapping(path = "by-id/{id}")
    public ResponseEntity<User> findByIdAuthenticationPrincipal(@PathVariable long id,
                                                                 @AuthenticationPrincipal UserDetails userDetails) {
        log.info(userDetails);
        return ResponseEntity.ok(userService.findByIdOrThrowBadRequestException(id));
    }

    @PostMapping
    public ResponseEntity<UserRequestDTO> save(@RequestBody @Valid UserRequestDTO userPostRequestBody) {
        return new ResponseEntity<>(userService.save(userPostRequestBody), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successful Operation"),
            @ApiResponse(responseCode = "400", description = "When User Does Not Exist in The Database")
    })
    public ResponseEntity<Void> delete(@PathVariable long id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Void> replace(@PathVariable Long id, @RequestBody UserRequestDTO userPutRequestBody) {
        if(id != null) {
            userPutRequestBody.setId(id);
        }
        userService.update(userPutRequestBody);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
