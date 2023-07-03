package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.cmpt276project.projectbackend.customerrors.UserError;
import com.cmpt276project.projectbackend.models.User;
import com.cmpt276project.projectbackend.models.UserRepository;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class UserController {

  @Autowired
  private UserRepository userRepo;

  record UserRequest(String username, String password, String email) {
  }

  record AdminRequest(String username, String adminKey) {
  }

  private User testUser = new User("testUsername", "testEmail", "testPassword");

  @GetMapping("/test")
  public User test() {
    return testUser;
  }

  @DeleteMapping("/delete")
  public void delete(@RequestBody AdminRequest request) {
    User user = userRepo.findByUsername(request.username());
    String admin = request.adminKey();

    if (admin.equals("admin123")) {
      userRepo.delete(user);
    }
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
  public User login(@RequestBody UserRequest request, HttpServletResponse res) throws IOException {
    String username = request.username();
    String password = request.password();

    User user = userRepo.findByUsername(username);

    if (user == null) {
      res.sendError(400, "User does not exist");
      return null;
    }

    if (!password.equals(user.getPassword())) {
      res.sendError(401, "User password is wrong");
      // return new UserError("User password is incorrect");
      return null;
    }

    return user;
  }
}