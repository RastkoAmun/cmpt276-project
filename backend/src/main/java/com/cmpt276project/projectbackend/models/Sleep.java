package com.cmpt276project.projectbackend.models;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import org.springframework.cglib.core.Local;

import jakarta.persistence.*;;

@Entity
@Table(name = "sleep")
public class Sleep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sleep_id")
    private Long sleepId;

    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "uid")
    private int uid;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "bed_time")
    private LocalTime bedTime;

    @Column(name = "wake_up_time")
    private LocalTime wakeUpTime;

    @Column(name = "satisfaction_level")
    private Integer satisfactionLevel;


    public Sleep() {
    }

    public Sleep(Integer uid, LocalDate date, LocalTime bedTime, LocalTime wakeUpTime, Integer satisfactionLevel) {
        this.uid = uid;
        this.date = date;
        this.bedTime = bedTime;
        this.wakeUpTime = wakeUpTime;
        this.satisfactionLevel = satisfactionLevel;
    }

    // Getters and setters

    public Long getSleepId() {
        return sleepId;
    }

    public void setSleepId(Long sleepId) {
        this.sleepId = sleepId;
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

    public LocalTime getBedTime() {
        return bedTime;
    }

    public void setBedTime(LocalTime bedTime) {
        this.bedTime = bedTime;
    }

    public LocalTime getWakeUpTime() {
        return wakeUpTime;
    }

    public void setWakeUpTime(LocalTime wakeUpTime) {
        this.wakeUpTime = wakeUpTime;
    }

    public Integer getSatisfactionLevel() {
        return satisfactionLevel;
    }

    public void setSatisfactionLevel(Integer satisfactionLevel) {
        this.satisfactionLevel = satisfactionLevel;
    }
}
