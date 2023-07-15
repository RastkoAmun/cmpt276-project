package com.cmpt276project.projectbackend.controllers;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.Exercise;
import com.cmpt276project.projectbackend.models.ExerciseRepository;

@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("data/exercise")
public class ExerciseController {
    
    private final ExerciseRepository exerRepository;
    
    @Autowired
    public ExerciseController(ExerciseRepository exerRepository) {
        this.exerRepository = exerRepository;
    }
    
    @PostMapping("/add")
    public ResponseEntity<Exercise> addSleepActivity(@RequestBody Exercise exercise) {
        try {
            System.out.println("Received Exercise: " + exercise.toString());
    
            Exercise savedExercise = exerRepository.save(exercise);
            if (savedExercise != null) {
                System.out.println("Exercise saved successfully: " + savedExercise.toString());
                return ResponseEntity.status(HttpStatus.CREATED).body(savedExercise);
            } else {
                System.out.println("Failed to save exercise");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } catch (Exception e) {
            System.err.println("Error adding exercise: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{userId}/{date}")
    public ResponseEntity<List<Exercise>> getCompletedExercises(@PathVariable("userId") int userId, @PathVariable("date") String date) {
        LocalDate exer_date = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);    
        List<Exercise> completedActivities = exerRepository.findByUidAndExerDate(userId, exer_date);
        return ResponseEntity.ok(completedActivities);
    }

    @DeleteMapping("/{userId}")
    public void deleteStudent(@PathVariable("userId") Long userId){
      exerRepository.deleteById(userId);
    }
}
