package com.cmpt276project.customerrors;

import com.cmpt276project.projectbackend.models.User;

public class UserError extends User {
  private String error;

  public UserError(String error) {
    this.error = error;
  }

  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }
}
