package com.corelab.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskRequestDTO {

    private Long id;
    private String title;
    private String detail;
    private String color;
    private Boolean favorite;
    private Date date = new Date();
    private UserRequestTaskDTO user;
}
