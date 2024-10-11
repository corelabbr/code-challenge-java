package com.corelab.springboot.config;

import com.corelab.springboot.domain.Task;
import com.corelab.springboot.domain.User;
import com.corelab.springboot.domain.enums.Authorize;
import com.corelab.springboot.repository.TaskRepository;
import com.corelab.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class DemoData implements CommandLineRunner {

    private BCryptPasswordEncoder pe;
    private UserRepository repo;
    private TaskRepository taskRepository;

    @Autowired
    DemoData(UserRepository repo, BCryptPasswordEncoder pe, TaskRepository taskRepository) {
        this.repo = repo;
        this.pe = pe;
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String...args) throws Exception {


        User user = new User(1L, "Alex", "alex", pe.encode("abc123"), "1,2,3,4,5,6,7,8");
        repo.saveAndFlush(user);

        List<Task> tasks = new ArrayList<>();
        for(int i = 1; i < 20; i ++) {
            tasks.add(Task.builder()
                    .title("Atividade 1")
                    .detail("tenha atenção")
                    .color("#FFF")
                    .favorite(true)
                    .user(user)
                    .date(new GregorianCalendar(2024, 7, 1, 1, 1).getTime())
                    .id(Long.parseLong(String.valueOf(i)))
                    .build());
        }

        tasks.add(Task.builder()
                .title("Limpar a casa")
                .detail("Não esquecer")
                .color("#FFF")
                .favorite(true)
                .user(user)
                .date(new GregorianCalendar(2024, 8, 1, 1, 1).getTime())
                .id(22L)
                .build());
        tasks.add(Task.builder()
                .title("Lavar a louça")
                .detail("Amanhã irá precisar")
                .color("#FFF")
                .favorite(true)
                .user(user)
                .date(new GregorianCalendar(2024, 9, 1, 1, 1).getTime())
                .id(23L)
                .build());

        tasks.forEach(task -> {
            taskRepository.saveAndFlush(task);
        });
    }
}
