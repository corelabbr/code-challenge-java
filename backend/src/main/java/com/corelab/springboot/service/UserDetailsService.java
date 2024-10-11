package com.corelab.springboot.service;

import com.corelab.springboot.domain.User;
import com.corelab.springboot.exception.BadRequestException;
import com.corelab.springboot.repository.UserRepository;
import com.corelab.springboot.security.UserSS;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username);
        return new UserSS(user.getId(), user.getUsername(), user.getName(), user.getPassword(), user.getAuthorities());
    }

}
