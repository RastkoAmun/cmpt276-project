package com.cmpt276project.projectbackend.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.FoodSummary;
import com.cmpt276project.projectbackend.models.FoodSummaryRepository;

@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/foodsummary")
public class FoodSummaryController {

    private final FoodSummaryRepository foodSummaryRepository;

    @Autowired
    public FoodSummaryController(FoodSummaryRepository foodSummaryRepository) {
        this.foodSummaryRepository = foodSummaryRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<FoodSummary> addFoodSummary(@RequestBody FoodSummary foodSummary) {
        try {
            Optional<FoodSummary> existingFoodSummary = foodSummaryRepository.findByUidAndDate(foodSummary.getUid(), foodSummary.getDate());

            if (existingFoodSummary.isPresent()) {
                FoodSummary currentFoodSummary = existingFoodSummary.get();
                double updatedTargetCalories = foodSummary.getTargetCalories();
                double updatedConsumedCalories = foodSummary.getConsumedCalories();
                currentFoodSummary.setTargetCalories(updatedTargetCalories);
                currentFoodSummary.setConsumedCalories(updatedConsumedCalories);

                FoodSummary savedFoodSummary = foodSummaryRepository.save(currentFoodSummary);

                if (savedFoodSummary != null) {
                    System.out.println("Food summary updated successfully: " + savedFoodSummary.toString());
                    return ResponseEntity.status(HttpStatus.OK).body(savedFoodSummary);
                } else {
                    System.out.println("Failed to update food summary");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            } else {
                FoodSummary savedFoodSummary = foodSummaryRepository.save(foodSummary);

                if (savedFoodSummary != null) {
                    System.out.println("Food summary added successfully: " + savedFoodSummary.toString());
                    return ResponseEntity.status(HttpStatus.CREATED).body(savedFoodSummary);
                } else {
                    System.out.println("Failed to add food summary");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            }
        } catch (Exception e) {
            System.err.println("Error adding food summary: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{userId}/{date}")
    public ResponseEntity<FoodSummary> updateFoodSummary(@RequestBody FoodSummary foodSummaryRequest,
            @PathVariable("userId") int userId, @PathVariable("date") String date) {
        try {
            LocalDate foodDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
            FoodSummary foodSummaryEntry = foodSummaryRepository.findByUidAndDate(userId, foodDate).get();
            foodSummaryEntry.setTargetCalories(foodSummaryRequest.getTargetCalories());
            foodSummaryEntry.setConsumedCalories(foodSummaryRequest.getConsumedCalories());
            foodSummaryEntry.setDate(foodSummaryRequest.getDate());
            foodSummaryRepository.save(foodSummaryEntry);
            return ResponseEntity.ok(foodSummaryEntry);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{userId}/{date}")
    public ResponseEntity<Optional<FoodSummary>> getFoodSummary(@PathVariable("userId") int userId,
            @PathVariable("date") String date) {
        LocalDate foodDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        Optional<FoodSummary> summary = foodSummaryRepository.findByUidAndDate(userId, foodDate);
        return ResponseEntity.ok(summary);
    }
}
