package com.cmpt276project.projectbackend.models;
import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.*;


@Entity
@Table(name = "food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer foodId;

    @Column(name = "food_name")
    private String foodName;

    @Column(name = "calorie")
    private Double calorie;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "date")
    private LocalDate date;


    public Food() {
    }

    public Food(String foodName, Double calorie, Integer uid, LocalDate date) {
        this.foodName = foodName;
        this.calorie = calorie;
        this.uid = uid;
        this.date = date;
    }


    public Integer getFoodId() {
        return foodId;
    }

    public void setFoodId(Integer foodId) {
        this.foodId = foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Double getCalorie() {
        return calorie;
    }

    public void setCalorie(Double calorie) {
        this.calorie = calorie;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
