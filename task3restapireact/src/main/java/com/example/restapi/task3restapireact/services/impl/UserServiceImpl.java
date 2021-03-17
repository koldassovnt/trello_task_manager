package com.example.restapi.task3restapireact.services.impl;

import com.example.restapi.task3restapireact.entities.Roles;
import com.example.restapi.task3restapireact.entities.Users;
import com.example.restapi.task3restapireact.repositories.RoleRepository;
import com.example.restapi.task3restapireact.repositories.UserRepository;
import com.example.restapi.task3restapireact.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserServices {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(s);
        if(user!=null){
            return user;
        }else{
            throw new UsernameNotFoundException("USER NOT FOUND");
        }
    }

    public Users findUserById(Long userId) {
        Optional<Users> userFromDb = userRepository.findById(userId);
        return userFromDb.orElse(new Users());
    }

    public List<Users> allUsers() {
        return userRepository.findAll();
    }

    public boolean saveUser(Users user) {
        Users userFromDB = userRepository.findByEmail(user.getUsername());

        if (userFromDB != null) {
            return false;
        }

        List<Roles> roles = roleRepository.findAll();
        roles.removeIf(r -> !r.getRole().equals("ROLE_USER"));

        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

    public boolean deleteUser(Long userId) {
        if (userRepository.findById(userId).isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    public List<Users> usergtList(Long idMin) {
        return em.createQuery("SELECT u FROM Users u WHERE u.id > :paramId", Users.class)
                .setParameter("paramId", idMin).getResultList();
    }
}
