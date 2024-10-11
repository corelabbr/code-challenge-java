package com.corelab.springboot.util;

import com.corelab.springboot.domain.User;
import com.corelab.springboot.domain.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserCreator {

    public static User createUserToBeSaved(BCryptPasswordEncoder pe){
        return User.builder()
                .username("marcos")
                .name("Marcos")
                .authorities("1,2,3,4,5,6")
                .password(pe.encode("1234"))
                .id(4L)
                .build();
    }

    public static User createUserToBeUser(BCryptPasswordEncoder pe){
        return User.builder()
                .username("lane")
                .name("Lane")
                .authorities("1,2,3,4,5,6,7,8,9")
                .password(pe.encode("1234"))
                .id(1L)
                .build();
    }

    public static User createUserWithoutPermission(BCryptPasswordEncoder pe){
        return User.builder()
                .username("tiago")
                .name("Tiago")
                .authorities("5,6,7,8,9")
                .password(pe.encode("1234"))
                .id(2L)
                .build();
    }

    public static User createUserWithoutMasterPermission(BCryptPasswordEncoder pe){
        return User.builder()
                .username("nei")
                .name("Claudinei")
                .authorities("1,2,3,4,5,6,7,8")
                .password(pe.encode("1234"))
                .id(3L)
                .build();
    }

}
