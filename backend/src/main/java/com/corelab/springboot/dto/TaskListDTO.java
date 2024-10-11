package com.corelab.springboot.dto;

import com.corelab.springboot.domain.Task;
import com.corelab.springboot.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskListDTO implements Serializable {
    private Long id;
    private String title;
    private String detail;
    private String color;
    private Boolean favorite;
    private Date date;
    private UserListTaskDTO user;
}
