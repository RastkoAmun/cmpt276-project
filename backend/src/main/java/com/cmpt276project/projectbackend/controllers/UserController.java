package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;
import java.util.Properties;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.cmpt276project.projectbackend.models.User;
import com.cmpt276project.projectbackend.models.UserRepository;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Multipart;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Authenticator;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserRepository userRepo;

  record UserRequest(String username, String password, String email) {
  }

  record AdminRequest(String username, String adminKey) {
  }

  @DeleteMapping
  public void delete(@RequestBody AdminRequest request) {
    User user = userRepo.findByUsername(request.username());

    String admin = request.adminKey();
    if (admin.equals("admin123")) {
      userRepo.delete(user);
    }
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

  @PostMapping("/forgetpassword")
  public User forgetPassword(@RequestBody UserRequest request, HttpServletResponse res, HttpServletRequest req)
      throws IOException, AddressException {
    String email = request.email();
    User user = userRepo.findByEmail(email);

    if (user == null) {
      res.sendError(400, "There is no account with associated email address");
      return null;
    } else {
      user.setResetToken(UUID.randomUUID().toString());

      // // Save token to database
      userRepo.save(user);
      String appUrl = req.getScheme() + "://" + req.getServerName();

      // // Email message
      String to = email;
      // provide sender's email ID
      // String from = "healthtrackrr@gmail.com";
      String from = "support@healthtrackrr.com";

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
            + "/reset?token=" + user.getResetToken() + "\n\nThanks,\nHealthTracker Support Team"
            + "\n\n"
            + "***********************************\n"
            + "This is an auto-generated email.\n"
            + "Please do not reply to this email.\n"
            + "***********************************");
        Transport.send(message);
        return user;

      } catch (MessagingException e) {
        throw new RuntimeException(e);
      }
    }

    // passwordResetEmail.add
    // passwordResetEmail.setTo(user.getEmail());
    // passwordResetEmail.setSubject("Password Reset Request");
    // passwordResetEmail.setText("To reset your password, click the link below:\n"
    // + appUrl
    // + "/reset?token=" + user.getResetToken());

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
      res.sendError(400, "Username is already taken");
      return null;
    }

    if (existingEmail != null) {
      res.sendError(400, "Email is already in use");
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
}