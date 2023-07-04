package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.User;
import com.cmpt276project.projectbackend.models.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

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
  public User register(@RequestBody UserRequest request, HttpServletResponse res) throws IOException {
    User existingUsername = userRepo.findByUsername(request.username());
    User existingEmail = userRepo.findByEmail(request.email());

    if (existingUsername != null) {
      res.sendError(400, "Username is already taken");
      return null;
    }

    if (existingEmail != null) {
      res.sendError(400, "Email is already in use");
      return null;
    }

    User newUser = new User();
    newUser.setUsername(request.username());
    newUser.setEmail(request.email());
    newUser.setPassword(request.password());

    userRepo.save(newUser);
    res.setStatus(201);

    return newUser;
  }
}