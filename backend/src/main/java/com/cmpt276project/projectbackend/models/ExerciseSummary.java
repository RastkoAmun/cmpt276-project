package com.cmpt276project.projectbackend.models;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "exercise_summary")
public class ExerciseSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "total_duration")
    private Integer totalDuration;

    @Column(name = "total_cal_burned")
    private Float totalCalBurned;

    @Column(name = "exer_summary_date")
    private LocalDate exerSumDate;
    

    // Constructors

   
    public ExerciseSummary() {
    }

    public ExerciseSummary(Integer uid, Integer totalDuration, Float totalCalBurned, LocalDate exerSumDate) {
        this.uid = uid;
        this.totalDuration = totalDuration;
        this.totalCalBurned = totalCalBurned;
        this.exerSumDate=exerSumDate;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(Integer totalDuration) {
        this.totalDuration = totalDuration;
    }

    public Float getTotalCalBurned() {
        return totalCalBurned;
    }

    public void setTotalCalBurned(Float totalCalBurned) {
        this.totalCalBurned = totalCalBurned;
    }

     public LocalDate getExerSumDate() {
        return exerSumDate;
    }

    public void setExerSumDate(LocalDate exerSumDate) {
        this.exerSumDate = exerSumDate;
    }

}
