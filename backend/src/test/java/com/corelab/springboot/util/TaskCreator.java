package com.corelab.springboot.util;

import com.corelab.springboot.domain.Task;
import com.corelab.springboot.domain.User;

import java.util.Date;

public class TaskCreator {

    public static Task createTaskToBeSaved(User user){
        return Task.builder()
                .title("Anotação 1")
                .detail("tenha atenção")
                .color("#FFF")
                .favorite(true)
                .user(user)
                .date(new Date())
                .id(1L)
                .build();
    }

    public static Task createTaskToBeUpdated(){
        return Task.builder()
                .title("Anotação 1")
                .detail("Tenha atenção, pois isso é muito importante")
                .favorite(true)
                .id(1L)
                .build();
    }

}
