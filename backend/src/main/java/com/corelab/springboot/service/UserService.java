package com.corelab.springboot.service;

import com.corelab.springboot.domain.User;
import com.corelab.springboot.dto.UserListDTO;
import com.corelab.springboot.dto.UserRequestDTO;
import com.corelab.springboot.exception.BadRequestException;
import com.corelab.springboot.repository.UserRepository;
import com.corelab.springboot.security.UserSS;
import com.corelab.springboot.specification.UserSpecification;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder pe;

    public Page<UserListDTO> listAll(String name, String username, Pageable pageable) {
        Specification<User> spec = UserSpecification.filterByParams(name, username);
        Page<User> page = userRepository.findAll(spec, pageable);
        return page.map(obj -> modelMapper.map(obj, UserListDTO.class));
    }

    public List<UserListDTO> listAllNonPageable() {
        return userRepository.findAll().stream().map(obj -> modelMapper.map(obj,UserListDTO.class)).collect(Collectors.toList());
    }

    public User findByIdOrThrowBadRequestException(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("User not Found"));
    }

    public UserListDTO findByIdDTOOrThrowBadRequestException(long id) {

        checkPermissionMaster(new Long(id), "No permission to view full user");
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("User not Found"));

        return modelMapper.map(user, UserListDTO.class);
    }

    @Transactional
    public UserRequestDTO save(UserRequestDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        if(user.getPassword() == null) {
            user.setPassword(user.getUsername());
        }
        user.setPassword(pe.encode(user.getPassword()));
        userRepository.save(user);
        return userDTO;
    }

    public void delete(long id) {
        this.checkPermissionMaster(id, "No permission to edit user");
        User user = findByIdOrThrowBadRequestException(id);
        userRepository.delete(user);
    }

    public void update(UserRequestDTO userDTO) {

        User user = modelMapper.map(userDTO, User.class);
        this.checkPermissionMaster(user.getId(), "No permission to delete user");

        User savedUser = findByIdOrThrowBadRequestException(user.getId());

        if(user.getPassword() == null) {
            user.setPassword(savedUser.getPassword());
        }
        else {
            user.setPassword(pe.encode(user.getPassword()));
        }
        user.setId(savedUser.getId());

        userRepository.save(user);
    }

    private void checkPermissionMaster(Long id, String message) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserSS userSS = (UserSS) auth.getPrincipal();
        if(!userSS.getId().equals(id) && auth.getAuthorities().stream().noneMatch(ga -> ga.getAuthority().equals("ROLE_USER_MASTER"))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, message);
        }
    }
}
