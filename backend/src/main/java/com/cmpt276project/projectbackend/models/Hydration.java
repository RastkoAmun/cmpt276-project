package com.cmpt276project.projectbackend.models;

import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "hydration")
public class Hydration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer uid;
    private Integer goal;
    private Integer intake;

    // @Column(name = "intake_date")
    private String intakeDate;

    public Hydration() {
    }

    public Hydration(Integer uid, Integer goal, Integer intake, String intakeDate) {
        this.uid = uid;
        this.intakeDate = intakeDate;
        this.goal = goal;
        this.intake = intake;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUid() {
        return uid;
    }
    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getIntakeDate() {
        return intakeDate;
    }
    public void setIntakeDate(String intakeDate) {
        this.intakeDate = intakeDate;
    }

    public Integer getGoal() {
        return goal;
    }
    public void setGoal(Integer goal) {
        this.goal = goal;
    }

    public Integer getIntake() {
        return intake;
    }
    public void setIntake(Integer intake) {
        this.intake = intake;
    }
}
