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
  private Boolean isAdmin;

  public User() {

  }

  public User(String username, String email, String password, Boolean isAdmin) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
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

  public Boolean getIsAdmin() {
    return isAdmin;
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

  public void setisAdmin(Boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

  public static class UserBuilder {
    private String username = "";
    private String password = "";
    private String email = "";
    private boolean isAdmin = false;

    public UserBuilder setUsername(String username) {
      this.username = username;
      return this;
    }

    public UserBuilder setPassword(String password) {
      this.password = password;
      return this;
    }

    public UserBuilder setEmail(String email) {
      this.email = email;
      return this;
    }

    UserBuilder setIsAdmin(boolean isAdmin) {
      this.isAdmin = isAdmin;
      return this;
    }

    public User build() {
      System.out.println(this.isAdmin);
      return new User(username, email, password, isAdmin);
    }
  }
}
