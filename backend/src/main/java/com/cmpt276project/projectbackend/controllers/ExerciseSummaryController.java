package com.cmpt276project.projectbackend.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.Exercise;
import com.cmpt276project.projectbackend.models.ExerciseSummary;
import com.cmpt276project.projectbackend.models.ExerciseSummaryRepository;
import com.cmpt276project.projectbackend.models.Hydration;

@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/exercisesummary")
public class ExerciseSummaryController {

    private final ExerciseSummaryRepository exerciseSummaryRepository;

    @Autowired
    public ExerciseSummaryController(ExerciseSummaryRepository exerciseSummaryRepository) {
        this.exerciseSummaryRepository = exerciseSummaryRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<ExerciseSummary> addExerciseSummary(@RequestBody ExerciseSummary exerciseSummary) {
        try {
            Optional<ExerciseSummary> existingExerciseSummary = exerciseSummaryRepository
                    .findByUidAndExerSumDate(exerciseSummary.getUid(), exerciseSummary.getExerSumDate());

            if (existingExerciseSummary.isPresent()) {
                ExerciseSummary currentExerciseSummary = existingExerciseSummary.get();
                int updatedTotalDuration = exerciseSummary.getTotalDuration();
                float updatedTotalCalBurned = exerciseSummary.getTotalCalBurned();
                currentExerciseSummary.setTotalDuration(updatedTotalDuration);
                currentExerciseSummary.setTotalCalBurned(updatedTotalCalBurned);

                ExerciseSummary savedExerciseSummary = exerciseSummaryRepository.save(currentExerciseSummary);

                if (savedExerciseSummary != null) {
                    System.out.println("Exercise summary updated successfully: " + savedExerciseSummary.toString());
                    return ResponseEntity.status(HttpStatus.OK).body(savedExerciseSummary);
                } else {
                    System.out.println("Failed to update exercise summary");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            } else {
                ExerciseSummary savedExerciseSummary = exerciseSummaryRepository.save(exerciseSummary);

                if (savedExerciseSummary != null) {
                    System.out.println("Exercise summary added successfully: " + savedExerciseSummary.toString());
                    return ResponseEntity.status(HttpStatus.CREATED).body(savedExerciseSummary);
                } else {
                    System.out.println("Failed to add exercise summary");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            }
        } catch (Exception e) {
            System.err.println("Error adding exercise summary: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{userId}/{date}")
    public ResponseEntity<ExerciseSummary> updateHydrationRecord(@RequestBody ExerciseSummary exerciseSummaryRequest,
            @PathVariable("userId") int userId,
            @PathVariable("date") String date) {
        try {
            LocalDate exer_date = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
            ExerciseSummary exerciseSummaryEntry = exerciseSummaryRepository.findByUidAndExerSumDate(userId, exer_date)
                    .get();
            exerciseSummaryEntry.setTotalDuration(exerciseSummaryRequest.getTotalDuration());
            exerciseSummaryEntry.setTotalCalBurned(exerciseSummaryRequest.getTotalCalBurned());
            exerciseSummaryEntry.setExerSumDate(exerciseSummaryRequest.getExerSumDate());
            exerciseSummaryRepository.save(exerciseSummaryEntry);
            return ResponseEntity.ok(exerciseSummaryEntry);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{userId}/{date}")
    public ResponseEntity<Optional<ExerciseSummary>> getCompletedActivities(@PathVariable("userId") int userId,
            @PathVariable("date") String date) {
        LocalDate exer_date = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        Optional<ExerciseSummary> summary = exerciseSummaryRepository.findByUidAndExerSumDate(userId, exer_date);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/{uid}")
    public List<ExerciseSummary> getHydrations(@PathVariable long uid) {
        List<ExerciseSummary> summaryList = exerciseSummaryRepository.findByUid(uid);
        return summaryList;
    }

}
