package com.corelab.springboot.dto;

import com.corelab.springboot.domain.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDTO {

    private Long id;
    private String name;
    private String username;
    private String password;
    private String authorities;
    private Set<Task> tasks = new HashSet<>();
}
