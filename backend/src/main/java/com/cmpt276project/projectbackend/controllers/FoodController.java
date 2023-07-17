package com.cmpt276project.projectbackend.controllers;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.Food;
import com.cmpt276project.projectbackend.models.FoodRepository;
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("data/food")
public class FoodController {

    private final FoodRepository foodRepository;

    @Autowired
    public FoodController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<Food> addFood(@RequestBody Food food) {
        try {
            System.out.println("Received Food: " + food.toString());

            Food savedFood = foodRepository.save(food);
            if (savedFood != null) {
                System.out.println("Food saved successfully: " + savedFood.toString());
                return ResponseEntity.status(HttpStatus.CREATED).body(savedFood);
            } else {
                System.out.println("Failed to save food");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } catch (Exception e) {
            System.err.println("Error adding food: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{userId}/{date}")
    public ResponseEntity<List<Food>> getCompletedFoods(@PathVariable("userId") int userId, @PathVariable("date") String date) {
        LocalDate foodDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        List<Food> addedFoods = foodRepository.findByUidAndDate(userId, foodDate);
        return ResponseEntity.ok(addedFoods);
    }

    @GetMapping("/{id}")
    public Food getFood(@PathVariable Integer id) {
        Optional<Food> foodOptional = foodRepository.findByUid(id);
        return foodOptional.orElse(null);
    }
}

