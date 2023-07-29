package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.rsocket.server.RSocketServer.Transport;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.enums.ActivityLevel;
import com.cmpt276project.projectbackend.enums.Climate;
import com.cmpt276project.projectbackend.enums.Sex;
import com.cmpt276project.projectbackend.models.User;
import com.cmpt276project.projectbackend.models.UserRepository;

import jakarta.mail.*;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
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

  record UserRequest(int uid, String username, String password, String email) {
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

  private User sendEmail(User user, HttpServletRequest req) {
    user.setResetToken(UUID.randomUUID().toString());

    // // Save token to database
    userRepo.save(user);
    String appUrl = req.getHeader("origin");

    // // Email message
    String to = user.getEmail();
    // provide sender's email ID
    final String username = "healthtrackrr@gmail.com";
    // provide Mailtrap's password
    final String password = "gnlfvwtbocntengo";
    Authenticator authenticator = new Authenticator() {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(username, password);
      }
    };
    String host = "smtp.gmail.com";
    Properties props = new Properties();
    props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.host", host);
    props.put("mail.smtp.port", "587");
    Session session = Session.getInstance(props, authenticator);

    try {
      Message message = new MimeMessage(session);
      // message.setFrom(new InternetAddress(from));
      message.setRecipients(Message.RecipientType.TO,
          InternetAddress.parse(to));
      message.setSubject("Request to Change Password");
      message.setText("To reset your password, click the link below:\n"
          + appUrl
          + "/changepassword/" + user.getResetToken()
          + "\n\nThanks,\nHealthTracker Support Team"
          + "\n\n"
          + "***********************************\n"
          + "This is an auto-generated email.\n"
          + "Please do not reply to this email.\n"
          + "***********************************");

      jakarta.mail.Transport.send(message);
      return user;

    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
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

  @GetMapping("/changepassword/{token}")
  public User getUserFromToken(@PathVariable String token) {
    User user = userRepo.findByResetToken(token);
    return user;
  }

  @PostMapping("/changepassword/{token}")
  public User changePassword(@RequestBody UserRequest request, HttpServletResponse res, HttpServletRequest req,
      @PathVariable String token)
      throws IOException, AddressException {
    String newPassword = request.password();
    User user = userRepo.findByResetToken(token);

    if (user == null) {
      return null;
    } else {
      user.setPassword(newPassword);
      userRepo.save(user);
      return user;
    }
  }

  @PostMapping("/forgetpassword")
  public User forgetPassword(@RequestBody UserRequest request, HttpServletResponse res, HttpServletRequest req)
      throws IOException, AddressException {
    String email = request.email();
    User user = userRepo.findByEmail(email);

    if (user == null) {
      res.sendError(400, "There is no account associated with email address");
      return null;
    } else {
      user = sendEmail(user, req);
      return user;
    }
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

  @PostMapping("/profile")
  public User getUserAndProfile(@RequestBody UserRequest request, HttpServletResponse res) throws IOException {
    User user = userRepo.findById(request.uid()).orElse(null);

    if (user == null) {
      res.sendError(400, "User does not exist");
      return null;
    }

    return user;
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
        ActivityLevel level = ActivityLevel.valueOf(request.activityLevel().toUpperCase());
        profile.setActivityLevel(level);
      }
      if (request.activityLevel() != null) {
        Climate climate = Climate.valueOf(request.climate().toUpperCase());
        profile.setClimate(climate);
      }
      if (request.activityLevel() != null) {
        Sex sex = Sex.valueOf(request.sex().toUpperCase());
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