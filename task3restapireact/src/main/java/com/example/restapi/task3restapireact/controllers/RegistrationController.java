package com.example.restapi.task3restapireact.controllers;

import com.example.restapi.task3restapireact.entities.Users;
import com.example.restapi.task3restapireact.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {

    @Autowired
    private UserServices userService;

    @RequestMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody Users users){

        if (!users.getPassword().equals(users.getPasswordConfirm()))
            return (ResponseEntity<?>) ResponseEntity.badRequest();

        else if (!userService.saveUser(users))
            return (ResponseEntity<?>) ResponseEntity.badRequest();

        userService.saveUser(users);
        return ResponseEntity.ok(users);
    }
}
