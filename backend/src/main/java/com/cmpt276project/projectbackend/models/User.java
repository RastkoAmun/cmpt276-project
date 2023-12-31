package com.cmpt276project.projectbackend.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User implements Comparable<User> {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int uid;
  private String username;
  private String password;
  private String email;
  private Boolean isAdmin;
  private String resetToken;
  private Boolean isFirstLogin;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "up_id")
  private UserProfile userProfile;

  public User() {

  }

  public User(String username, String email, String password, Boolean isAdmin, Boolean isFirstLogin) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.isFirstLogin = isFirstLogin;
    this.userProfile = new UserProfile();
  }

  public UserProfile getUserProfile() {
    return userProfile;
  }

  public Integer getUid() {
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

  public String getResetToken() {
    return resetToken;
  }

  public Boolean getIsFirstLogin() {
    return isFirstLogin;
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

  public void setIsAdmin(Boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

  public void setIsFirstLogin(Boolean isFirstLogin) {
    this.isFirstLogin = isFirstLogin;
  }

  public void setResetToken(String resetToken) {
    this.resetToken = resetToken;
  }

  public static class UserBuilder {
    private String username = "";
    private String password = "";
    private String email = "";
    private boolean isAdmin = false;
    private boolean isFirstLogin = true;

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

    public User build() {
      return new User(username, email, password, isAdmin, isFirstLogin);
    }
  }

  @Override
  public int compareTo(User arg0) {
    return this.getUid().compareTo(arg0.getUid());
  }
}
