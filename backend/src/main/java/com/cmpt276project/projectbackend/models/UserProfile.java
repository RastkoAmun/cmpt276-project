package com.cmpt276project.projectbackend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profile")
public class UserProfile {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int up_id;
  private int age;
  private double height;
  private double weight;
  private Sex sex;
  private ActivityLevel activityLevel;
  private Climate climate;

  @OneToOne(mappedBy = "userProfile")
  private User user;

  enum Sex {
    MALE,
    FEMALE
  }

  enum ActivityLevel {
    SENDENTARY,
    LIGHT,
    MODERATE,
    HEAVY
  }

  enum Climate {
    HOT,
    TEMPERATE,
    COLD
  }

  public int getAge() {
    return this.age;
  }

  public double getWeight() {
    return this.weight;
  }

  public double getHeight() {
    return this.height;
  }

  public Sex getSex() {
    return this.sex;
  }

  public ActivityLevel getActivityLevel() {
    return this.activityLevel;
  }

  public Climate getClimate() {
    return this.climate;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public void setWeight(double weight) {
    this.weight = weight;
  }

  public void setHeight(double height) {
    this.height = height;
  }

  public void setSex(Sex sex) {
    this.sex = sex;
  }

  public void setClimate(Climate climate) {
    this.climate = climate;
  }

  public void setActivityLevel(ActivityLevel activityLevel) {
    this.activityLevel = activityLevel;
  }

}