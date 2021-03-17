package com.example.restapi.task3restapireact.services;

import com.example.restapi.task3restapireact.entities.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserServices extends UserDetailsService {

    Users findUserById(Long id);
    List<Users> allUsers();
    boolean deleteUser(Long userId);
    List<Users> usergtList(Long idMin);
    boolean saveUser(Users user);
}
