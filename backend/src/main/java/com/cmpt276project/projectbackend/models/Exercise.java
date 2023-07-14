package com.cmpt276project.projectbackend.models;
import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name="exercise")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="exercise_id")
    private int exerciseId;
    private int uid;
   @Column(name="exercise_name")
    private String exerciseName;
    private int duration;
    @Column(name="calories_burned")
    private float caloriesBurned;
    @Column(name="exer_date")
    private LocalDate exerDate;
    
    public Exercise(){
        
    }
    public Exercise( int uid, String exerciseName, int duration, float caloriesBurned, LocalDate exerDate) {
        this.uid = uid;
        this.exerciseName = exerciseName;
        this.duration = duration;
        this.caloriesBurned = caloriesBurned;
        this.exerDate = exerDate;
    }
    
    // Getters and Setters
    public int getExerciseId() {
        return exerciseId;
    }
    
    public void setExerciseId(int exerciseId) {
        this.exerciseId = exerciseId;
    }
    
    public int getUid() {
        return uid;
    }
    
    public void setUid(int uid) {
        this.uid = uid;
    }
    
    public String getExerciseName() {
        return exerciseName;
    }
    
    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }
    
    public int getDuration() {
        return duration;
    }
    
    public void setDuration(int duration) {
        this.duration = duration;
    }
    
    public float getCaloriesBurned() {
        return caloriesBurned;
    }
    
    public void setCaloriesBurned(float caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }
    
    public LocalDate getExerDate() {
        return exerDate;
    }
    
    public void setTimestamp(LocalDate exerDate) {
        this.exerDate = exerDate;
    }
}
