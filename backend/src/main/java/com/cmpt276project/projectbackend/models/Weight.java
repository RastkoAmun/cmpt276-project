package com.cmpt276project.projectbackend.models;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "weight")
public class Weight {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int weightId;
  private int uid;
  private LocalDate date;

  public Weight() {

  }

  public Weight(int uid, LocalDate date) {
    this.uid = uid;
    this.date = date;
  }

  public int getWeightId() {
    return weightId;
  }

  public int getUid() {
    return uid;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setUid(int uid) {
    this.uid = uid;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }
}
