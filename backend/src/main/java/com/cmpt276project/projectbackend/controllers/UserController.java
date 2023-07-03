package com.cmpt276project.projectbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.customerrors.UserError;
import com.cmpt276project.projectbackend.models.User;
import com.cmpt276project.projectbackend.models.UserRepository;

@RestController
public class UserController {

  @Autowired
  private UserRepository userRepo;

  record UserRequest(String username, String password, String email) {
  }

  private User testUser = new User("testUsername", "testEmail", "testPassword");

  @GetMapping("/test")
  public User test() {
    return testUser;
  }

  @GetMapping("/test1")
  public List<User> test1() {
    List<User> viewAll = userRepo.findAll();

    return viewAll;
  }

  @PostMapping("/register")
  public User register(@RequestBody UserRequest request) {
    User existingUsername = userRepo.findByUsername(request.username());
    User existingEmail = userRepo.findByEmail(request.email());

    if (existingUsername != null) {
      return new UserError("Username is taken");
    }

    if (existingEmail != null) {
      return new UserError("Email already in use");
    }

    User newUser = new User();
    newUser.setUsername(request.username());
    newUser.setEmail(request.email());
    newUser.setPassword(request.password());

    userRepo.save(newUser);

    return newUser;
  }

  @PostMapping("/login")
  public User login(@RequestBody UserRequest request) {
    String username = request.username();
    String password = request.password();

    User user = userRepo.findByUsername(username);

    if (user == null) {
      return new UserError("User does not exist");
    }

    if (!password.equals(user.getPassword())) {
      return new UserError("User password is incorrect");
    }

    return user;
  }
}