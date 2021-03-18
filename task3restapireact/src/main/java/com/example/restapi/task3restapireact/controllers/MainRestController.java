package com.example.restapi.task3restapireact.controllers;

import com.example.restapi.task3restapireact.dto.UpdatePasswordRequest;
import com.example.restapi.task3restapireact.dto.UserDTO;
import com.example.restapi.task3restapireact.entities.CardTasks;
import com.example.restapi.task3restapireact.entities.Cards;
import com.example.restapi.task3restapireact.entities.Users;
import com.example.restapi.task3restapireact.services.CardServices;
import com.example.restapi.task3restapireact.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class MainRestController {

    @Autowired
    CardServices cardServices;

    @Autowired
    private UserServices userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping(value = "/allcards")
    public ResponseEntity<?> getAllCards(){
        List<Cards> cards = cardServices.getAllCards();
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @PostMapping(value = "/addcard")
    public ResponseEntity<?> addCard(@RequestBody Cards cards){
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        cards.setAddedDate(timestamp);
        cardServices.addCard(cards);
        return ResponseEntity.ok(cards);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<?> cardDetail(@PathVariable(name = "id") Long id) {
        Cards cards = cardServices.getCard(id);
//        List<CardTasks> cardTasks = cardServices.getOneCardTasks(id);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @PostMapping(value = "/detail/{id}")
    public ResponseEntity<?> addTask(@PathVariable(name = "id") Long id, @RequestBody CardTasks cardTasks) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Cards cards = cardServices.getCard(id);
        cardTasks.setAddedDate(timestamp);
        cardTasks.setDone(false);
        cardTasks.setCards(cards);
        cardServices.addCardTask(cardTasks);
        return ResponseEntity.ok(cardTasks);
    }

    @GetMapping(value = "/cardtasks/{id}")
    public ResponseEntity<?> getCardTasks(@PathVariable(name = "id") Long id) {
        List<CardTasks> cardTasks = cardServices.getOneCardTasks(id);
        return new ResponseEntity<>(cardTasks, HttpStatus.OK);
    }

    @PostMapping(value = "/deletecard/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable(name = "id") Long id) {
        Cards cards = cardServices.getCard(id);
        cardServices.deleteCard(cards);
        return ResponseEntity.ok(cards);
    }

    @PostMapping(value = "/updateTask/{id}")
    public ResponseEntity<?> updateTask(@PathVariable(name = "id") Long id) {
        CardTasks cardTasks = cardServices.getCardTask(id);
        cardTasks.setDone(!cardTasks.isDone());
        cardServices.saveCardTask(cardTasks);
        return ResponseEntity.ok(cardTasks);
    }

    @GetMapping(value = "/profile")
    public ResponseEntity<?> profilePage(){
        Users user = getUser();
        return new ResponseEntity<>(new UserDTO(user.getId(), user.getEmail(), user.getFullName(), user.getRoles()), HttpStatus.OK);
    }

    @PostMapping(value = "/updateName")
    public ResponseEntity<?> updateUserName(@RequestBody Users reqUser){
        System.out.println(reqUser);
        Users user = getUser();
        System.out.println(user);
        user.setFullName(reqUser.getFullName());
        userService.editUser(user);
        return ResponseEntity.ok("Name changed successfully");
    }

    @PostMapping("/editPassword")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> editPassword(@RequestBody UpdatePasswordRequest passwordRequest){
        Users user = getUser();
        if (user != null){
            if (passwordEncoder.matches(passwordRequest.getOldPassword(), user.getPassword())
                    && passwordRequest.getNewPassword().equals(passwordRequest.getPasswordConfirm())){
                user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
                userService.editUser(user);
                return ResponseEntity.ok("Password changed successfully");
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private Users getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            Users user = (Users) authentication.getPrincipal();
            return user;
        }
        return null;
    }
}
