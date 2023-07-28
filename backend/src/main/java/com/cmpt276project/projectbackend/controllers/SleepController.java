package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.Sleep;
import com.cmpt276project.projectbackend.models.SleepRepository;


@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/sleep")
public class SleepController {

    private final SleepRepository sleepRepo;

    public SleepController(SleepRepository sleepRepo) {
        this.sleepRepo = sleepRepo;
    }

    // post mapping to add user sleep entry, add it based on user id and intake date
    @PostMapping("/add")
    public ResponseEntity<String> addSleepData(@RequestBody Sleep sleepRequest) {
        try {
            // Check if a record with the same date and uid already exists
            LocalDate todayDate = LocalDate.now();
            Sleep existingSleepData = sleepRepo.findByDateAndUid(todayDate, sleepRequest.getUid());
            if (existingSleepData != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Sleep data already exists for the given date and uid");
            }

            sleepRepo.save(sleepRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Sleep data added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add sleep data");
        }
    }

    @GetMapping("/sleep-data")
    public ResponseEntity<List<Sleep>> getSleepDataForLastFiveDays(@RequestParam("uid") Long uid) {
        try {
            // Calculate the date five days ago
            LocalDate fiveDaysAgo = LocalDate.now().minusDays(10);

            // Query the sleepRepo to retrieve sleep data for the last five days based on
            // uid
            List<Sleep> sleepData = sleepRepo.findByUidAndDateAfterOrderByDateAsc(uid, fiveDaysAgo);

            return ResponseEntity.ok(sleepData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/sleep-data/{uid}")
    public List<Sleep> getSleep(@PathVariable Long uid) {
        // return hydrationRepo.findByUid(uid);
        List<Sleep> hydrationByUid = sleepRepo.findByUid(uid);
        return hydrationByUid;
    }

}
