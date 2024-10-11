package com.corelab.springboot.integration;

import com.corelab.springboot.domain.User;
import com.corelab.springboot.dto.UserListDTO;
import com.corelab.springboot.dto.UserRequestDTO;
import com.corelab.springboot.exception.BadRequestException;
import com.corelab.springboot.repository.UserRepository;
import com.corelab.springboot.security.JWTUtil;
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
class UserControllerIT {
    @Autowired
    private JWTUtil jwtTokenService;

    @Autowired
    @Qualifier("testRestTemplateWithRoles")
    private TestRestTemplate testRestTemplateWithRoles;

    @Autowired
    @Qualifier("testRestTemplateWithoutRoles")
    private TestRestTemplate testRestTemplateWithoutRoles;

    @Autowired
    @Qualifier("testRestTemplateWithoutMasterPermission")
    private TestRestTemplate testRestTemplateWithoutMasterPermission;

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
        userRepository.saveAndFlush(UserCreator.createUserWithoutMasterPermission(pe));
        testRestTemplateWithRoles.getRestTemplate().setUriTemplateHandler(new DefaultUriBuilderFactory("http://localhost:" + port));
        testRestTemplateWithoutRoles.getRestTemplate().setUriTemplateHandler(new DefaultUriBuilderFactory("http://localhost:" + port));
        testRestTemplateWithoutMasterPermission.getRestTemplate().setUriTemplateHandler(new DefaultUriBuilderFactory("http://localhost:" + port));
    }

    @Test
    @DisplayName("list returns list of user inside page object when successful")
    void list_ReturnsListOfUsersInsidePageObject_WhenSuccessful() {
        User savedUser = userRepository.save(UserCreator.createUserToBeSaved(pe));

        String expectedName = savedUser.getName();

        PageableResponse<UserListDTO> userPage = testRestTemplateWithRoles.exchange("/user", HttpMethod.GET, null,
                new ParameterizedTypeReference<PageableResponse<UserListDTO>>() {
                }).getBody();

        Assertions.assertThat(userPage).isNotNull();

        Assertions.assertThat(userPage.toList())
                .isNotEmpty()
                .hasSize(4);

        Assertions.assertThat(userPage.toList().get(3).getName()).isEqualTo(expectedName);
    }

    @Test
    @DisplayName("listAll returns list of user when successful")
    void listAll_ReturnsListOfUsers_WhenSuccessful() {
        User savedUser = userRepository.save(UserCreator.createUserToBeSaved(pe));

        String expectedName = savedUser.getName();

        List<User> user = testRestTemplateWithRoles.exchange("/user/all", HttpMethod.GET, null,
                new ParameterizedTypeReference<List<User>>() {
                }).getBody();

        Assertions.assertThat(user)
                .isNotNull()
                .isNotEmpty()
                .hasSize(4);

        Assertions.assertThat(user.get(3).getName()).isEqualTo(expectedName);
    }

    @Test
    @DisplayName("findById returns user when successful")
    void findById_ReturnsUser_WhenSuccessful() {
        User savedUser = userRepository.save(UserCreator.createUserToBeSaved(pe));

        Long expectedId = savedUser.getId();

        User user = testRestTemplateWithRoles.getForObject("/user/{id}", User.class, expectedId);

        Assertions.assertThat(user).isNotNull();

        Assertions.assertThat(user.getId()).isNotNull().isEqualTo(expectedId);
    }

    @Test
    @DisplayName("save returns user when successful")
    void save_ReturnsUser_WhenSuccessful() {

        User userPostRequestBody = UserCreator.createUserToBeSaved(pe);
        UserRequestDTO userRequestDTO = modelMapper.map(userPostRequestBody, UserRequestDTO.class);

        ResponseEntity<UserRequestDTO> userResponseEntity = testRestTemplateWithRoles.postForEntity("/user", userRequestDTO, UserRequestDTO.class);

        Assertions.assertThat(userResponseEntity).isNotNull();
        Assertions.assertThat(userResponseEntity.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Assertions.assertThat(userResponseEntity.getBody()).isNotNull();
        Assertions.assertThat(userResponseEntity.getBody().getId()).isNotNull();

    }

    @Test
    @DisplayName("replace updates user when successful")
    void replace_UpdatesUser_WhenSuccessful() {
        User savedUser = userRepository.save(UserCreator.createUserToBeSaved(pe));

        UserRequestDTO newUser = UserRequestDTO.builder()
                .username("marcos")
                .name("new name")
                .authorities("1,2,3")
                .tasks(new HashSet<>())
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserRequestDTO> requestEntity = new HttpEntity<>(newUser, headers);
        ResponseEntity<Void> userResponseEntity = testRestTemplateWithRoles.exchange("/user/{id}",
                HttpMethod.PUT, requestEntity, Void.class, savedUser.getId());

        User user = userRepository.findById(savedUser.getId())
                .orElseThrow(() -> new BadRequestException("User not Found"));;

        Assertions.assertThat(user.getName()).isEqualTo(newUser.getName());
        Assertions.assertThat(userResponseEntity).isNotNull();

        Assertions.assertThat(userResponseEntity.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    @DisplayName("delete removes user when successful")
    void delete_RemovesUser_WhenSuccessful() {
        User savedUser = userRepository.save(UserCreator.createUserToBeSaved(pe));

        ResponseEntity<Void> userResponseEntity = testRestTemplateWithRoles.exchange("/user/{id}",
                HttpMethod.DELETE, null, Void.class, savedUser.getId());

        Assertions.assertThat(userResponseEntity).isNotNull();

        Assertions.assertThat(userResponseEntity.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }
    @Test
    @DisplayName("delete returns 403 when user is not admin")
    void delete_Returns403_WhenUserIsNotAdmin() {
        User savedUser = userRepository.save(UserCreator.createUserToBeSaved(pe));

        ResponseEntity<Void> userResponseEntity = testRestTemplateWithoutRoles.exchange("/user/{id}",
                HttpMethod.DELETE, null, Void.class, savedUser.getId());

        Assertions.assertThat(userResponseEntity).isNotNull();

        Assertions.assertThat(userResponseEntity.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    @DisplayName("replace returns 403 when user is not the same user logged in")
    void replace_Returns403_WhenUserIsNotTheSameUserLoggedIn() {
        User savedUser = userRepository.save(UserCreator.createUserToBeSaved(pe));

        UserRequestDTO newUser = UserRequestDTO.builder()
                .username("marcos")
                .name("new name")
                .authorities("1,2,3")
                .tasks(new HashSet<>())
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserRequestDTO> requestEntity = new HttpEntity<>(newUser, headers);
        ResponseEntity<Void> userResponseEntity = testRestTemplateWithoutMasterPermission.exchange("/user/{id}",
                HttpMethod.PUT, requestEntity, Void.class, savedUser.getId());

        Assertions.assertThat(userResponseEntity).isNotNull();

        Assertions.assertThat(userResponseEntity.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

}
