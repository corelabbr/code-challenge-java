package com.corelab.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskListUserDTO implements Serializable {
    private Long id;
    private String title;
    private String detail;
    private String color;
    private Boolean favorite;
}
