package com.corelab.springboot.dto;

import com.corelab.springboot.domain.Task;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserListTaskDTO implements Serializable {
    private Long id;
    private String name;
    private String username;
}
