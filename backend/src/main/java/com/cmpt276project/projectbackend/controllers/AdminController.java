package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.User;
import com.cmpt276project.projectbackend.models.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/admin")
public class AdminController {

  @Autowired
  private UserRepository userRepo;

  record AdminRequest(String username, Boolean isAdmin) {
  }

  @DeleteMapping("/delete")
  public void delete(@RequestBody AdminRequest request, HttpServletResponse res) throws IOException {
    User user = userRepo.findByUsername(request.username());

    if (user == null) {
      res.sendError(400, "User not found");
      return;
    }
    userRepo.delete(user);
    res.setStatus(200);
    return;
  }

  @PatchMapping("/permissions")
  public User userPermissions(@RequestBody AdminRequest request, HttpServletResponse res) throws IOException {
    User user = userRepo.findByUsername(request.username());

    System.out.println(user);

    if (user == null) {
      res.sendError(400, "User not found");
      return null;
    }

    if (request.isAdmin() == null) {
      res.sendError(400, "User privileges not specified");
      return null;
    }

    user.setIsAdmin(request.isAdmin());
    userRepo.save(user);

    return user;
  }

  @GetMapping("/view")
  public List<User> viewUsers() {
    List<User> userList = userRepo.findAll();
    Collections.sort(userList);
    return userList;
  }
}
