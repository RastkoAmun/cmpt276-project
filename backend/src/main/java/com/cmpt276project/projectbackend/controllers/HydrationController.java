package com.cmpt276project.projectbackend.controllers;

import com.cmpt276project.projectbackend.models.Hydration;
import com.cmpt276project.projectbackend.models.HydrationRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/data/hydration")
public class HydrationController {

    private final HydrationRepository hydrationRepo;

    public HydrationController(HydrationRepository hydrationRepo) {
        this.hydrationRepo = hydrationRepo;
    }

    @GetMapping
    public List<Hydration> getHydrations() {
        return hydrationRepo.findAll();
    }

    @GetMapping("/{uid}")
    public Hydration getHydrations(@PathVariable Integer uid) {
        return hydrationRepo.findByUid(uid);
    }

    @PostMapping
    public ResponseEntity<Hydration> createHydrationRecord(@RequestBody Hydration hydrationRequest) {
        try {
            Hydration hydration = new Hydration(
                    hydrationRequest.getUid(),
                    hydrationRequest.getGoal(),
                    hydrationRequest.getIntake(),
                    hydrationRequest.getIntakeDate());
            Hydration savedHydration = hydrationRepo.save(hydration);
            return ResponseEntity.ok(savedHydration);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{uid}")
    public ResponseEntity<Hydration> updateHydrationRecord(@RequestBody Hydration hydrationRequest, @PathVariable int uid) {
        try {
            Hydration hydrationEntry = hydrationRepo.findByUid(uid);
            hydrationEntry.setGoal(hydrationRequest.getGoal());
            hydrationRepo.save(hydrationEntry);
            return ResponseEntity.ok(hydrationEntry);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}