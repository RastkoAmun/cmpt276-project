package com.cmpt276project.projectbackend.models;
import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "food_summary")
public class FoodSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "target_calories")
    private Double targetCalories;

    @Column(name = "consumed_calories")
    private Double consumedCalories;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "date")
    private LocalDate date;

    public FoodSummary() {
    }

    public FoodSummary(Double targetCalories, Double consumedCalories, Integer uid, LocalDate date) {
        this.targetCalories = targetCalories;
        this.consumedCalories = consumedCalories;
        this.uid = uid;
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getTargetCalories() {
        return targetCalories;
    }

    public void setTargetCalories(Double targetCalories) {
        this.targetCalories = targetCalories;
    }

    public Double getConsumedCalories() {
        return consumedCalories;
    }

    public void setConsumedCalories(Double consumedCalories) {
        this.consumedCalories = consumedCalories;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
