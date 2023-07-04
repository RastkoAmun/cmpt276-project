package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.User;
import com.cmpt276project.projectbackend.models.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

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

    // TODO: implement admin permissions
    String admin = request.adminKey();
    if (admin.equals("admin123")) {
      userRepo.delete(user);
    }
  }

  @GetMapping("/login")
  public User getLogin(HttpServletRequest req, HttpSession session) {
    User user = (User) session.getAttribute("session_user");

    if (user == null) {
      return null;
    }

    return user;
  }

  @PostMapping("/login")
  public User login(@RequestBody UserRequest request, HttpServletResponse res, HttpServletRequest req,
      HttpSession session)
      throws IOException {
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

    req.getSession().setAttribute("session_user", user);
    return user;
  }

  @GetMapping("/logout")
  public void logout(HttpServletRequest req) {
    req.getSession().invalidate();
  }
}