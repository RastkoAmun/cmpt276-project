package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.enums.ActivityLevel;
import com.cmpt276project.projectbackend.enums.Climate;
import com.cmpt276project.projectbackend.enums.Sex;
import com.cmpt276project.projectbackend.models.User;
import com.cmpt276project.projectbackend.models.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.cmpt276project.projectbackend.models.UserProfile;

@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserRepository userRepo;

  record UserRequest(String username, String password, String email) {
  }

  record UserProfileRequest(int uid, Integer age, Double weight, Double height, String activityLevel,
      String climate,
      String sex) {
  }

  @GetMapping("/login")
  public User getLogin(HttpServletRequest req, HttpSession session) {
    User user = (User) session.getAttribute("session_user");

    if (user == null) {
      return new User();
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

  @PostMapping("/register")
  public User register(@RequestBody UserRequest request, HttpServletResponse res) throws IOException {
    User existingUsername = userRepo.findByUsername(request.username());
    User existingEmail = userRepo.findByEmail(request.email());

    if (existingUsername != null) {
      res.sendError(409, "Username is already taken");
      return null;
    }

    if (existingEmail != null) {
      res.sendError(409, "Email is already in use");
      return null;
    }

    User newUser = new User.UserBuilder()
        .setUsername(request.username())
        .setEmail(request.email())
        .setPassword(request.password())
        .build();

    userRepo.save(newUser);
    res.setStatus(201);

    return newUser;
  }

  @PatchMapping("/profile")
  public User UserProfile(@RequestBody UserProfileRequest request, HttpServletResponse res) throws IOException {

    User user = userRepo.findById(request.uid()).orElse(null);

    if (user == null) {
      res.sendError(400, "User does not exist");
      return null;
    }

    UserProfile profile = user.getUserProfile();

    if (request.age() != null)
      profile.setAge(request.age());

    if (request.weight() != null)
      profile.setWeight(request.weight());

    if (request.height() != null)
      profile.setHeight(request.height());

    try {
      if (request.activityLevel() != null) {
        ActivityLevel level = ActivityLevel.valueOf(request.activityLevel());
        profile.setActivityLevel(level);
      }
      if (request.activityLevel() != null) {
        Climate climate = Climate.valueOf(request.climate());
        profile.setClimate(climate);
      }
      if (request.activityLevel() != null) {
        Sex sex = Sex.valueOf(request.sex());
        profile.setSex(sex);
      }
    } catch (IllegalArgumentException e) {
      res.sendError(400, e.getMessage());
      return null;
    }

    userRepo.save(user);

    return user;
  }
}