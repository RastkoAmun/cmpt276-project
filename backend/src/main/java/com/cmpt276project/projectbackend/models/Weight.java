package com.cmpt276project.projectbackend.models;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "weight")
public class Weight implements Comparable<Weight> {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int weightId;
  private int uid;
  private double weight;
  private LocalDate date;

  public Weight() {

  }

  public Weight(int uid, double weight, LocalDate date) {
    this.uid = uid;
    this.date = date;
    this.weight = weight;
  }

  public Integer getWeightId() {
    return weightId;
  }

  public int getUid() {
    return uid;
  }

  public double getWeight() {
    return weight;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setUid(int uid) {
    this.uid = uid;
  }

  public void setWeight(double weight) {
    this.weight = weight;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  @Override
  public int compareTo(Weight arg0) {
    return this.getDate().compareTo(arg0.getDate());
  }
}
