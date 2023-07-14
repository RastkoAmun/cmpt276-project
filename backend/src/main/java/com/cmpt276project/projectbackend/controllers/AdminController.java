package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;

import org.hibernate.annotations.Cascade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.User;
import com.cmpt276project.projectbackend.models.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

// @CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/admin")
public class AdminController {

  @Autowired
  private UserRepository userRepo;

  record AdminRequest(String username, String adminKey) {
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

  @PatchMapping
  public User makeAdminUser(@RequestBody AdminRequest request, HttpServletResponse res) throws IOException {
    User user = userRepo.findByUsername(request.username());

    if (user == null) {
      res.sendError(400, "User not found");
      return null;
    }

    return user;
  }
}
