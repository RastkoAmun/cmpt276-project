package com.cmpt276project.projectbackend.controllers;

import com.cmpt276project.projectbackend.models.Hydration;
import com.cmpt276project.projectbackend.models.HydrationRepository;

import java.util.Collections;
import java.util.List;

import org.hibernate.mapping.Collection;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public List<Hydration> getHydrations(@PathVariable Integer uid) {
        // return hydrationRepo.findByUid(uid);
        List<Hydration> hydrationByUid = hydrationRepo.findByUid(uid);
        return hydrationByUid;
    }

    @GetMapping("/{uid}/{intakeDate}")
    public Hydration getHydrationsByDate(@PathVariable Integer uid,
            @PathVariable String intakeDate) {
        return hydrationRepo.findByUidAndIntakeDate(uid, intakeDate);
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

    @PutMapping("/{uid}/{intakeDate}")
    public ResponseEntity<Hydration> updateHydrationRecord(@RequestBody Hydration hydrationRequest,
            @PathVariable Integer uid, @PathVariable String intakeDate) {
        try {
            Hydration hydrationEntry = hydrationRepo.findByUidAndIntakeDate(uid, intakeDate);
            hydrationEntry.setUid(hydrationRequest.getUid());
            hydrationEntry.setGoal(hydrationRequest.getGoal());
            hydrationEntry.setIntake(hydrationRequest.getIntake());
            hydrationEntry.setIntakeDate(hydrationRequest.getIntakeDate());
            hydrationRepo.save(hydrationEntry);
            return ResponseEntity.ok(hydrationEntry);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}