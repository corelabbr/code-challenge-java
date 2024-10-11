package com.corelab.springboot.config;

import com.corelab.springboot.domain.User;
import com.corelab.springboot.repository.UserRepository;
import com.corelab.springboot.security.JWTUtil;
import com.corelab.springboot.util.UserCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ConfigRestTemplate {

    @Autowired
    private JWTUtil jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder pe;

    @Bean(name = "testRestTemplateWithRoles")
    public TestRestTemplate testRestTemplateWithRolesCreator() {

        User user = UserCreator.createUserToBeUser(pe);
        String token = jwtTokenService.generateToken(user.getId(), user.getUsername(), user.getName());

        RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder()
                .additionalInterceptors((request, body, execution) -> {
                    request.getHeaders().add(HttpHeaders.AUTHORIZATION, "Bearer " + token);
                    request.getHeaders().add(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8");
                    return execution.execute(request, body);
                });

        return new TestRestTemplate(restTemplateBuilder);
    }

    @Bean(name = "testRestTemplateWithoutRoles")
    public TestRestTemplate testRestTemplateWithoutRoles() {

        User user = UserCreator.createUserWithoutPermission(pe);
        String token = jwtTokenService.generateToken(user.getId(), user.getUsername(), user.getName());

        RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder()
                .additionalInterceptors((request, body, execution) -> {
                    request.getHeaders().add(HttpHeaders.AUTHORIZATION, "Bearer " + token);
                    return execution.execute(request, body);
                });

        return new TestRestTemplate(restTemplateBuilder);
    }

    @Bean(name = "testRestTemplateWithoutMasterPermission")
    public TestRestTemplate testRestTemplateWithoutMasterPermission() {

        User user = UserCreator.createUserWithoutMasterPermission(pe);
        String token = jwtTokenService.generateToken(user.getId(), user.getUsername(), user.getName());

        RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder()
                .additionalInterceptors((request, body, execution) -> {
                    request.getHeaders().add(HttpHeaders.AUTHORIZATION, "Bearer " + token);
                    return execution.execute(request, body);
                });

        return new TestRestTemplate(restTemplateBuilder);
    }
}
