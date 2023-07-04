package com.cmpt276project.projectbackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int uid;
  private String username;
  private String password;
  private String email;

  public User() {

  }

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public int getUid() {
    return uid;
  }

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}