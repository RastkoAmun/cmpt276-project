package com.cmpt276project.projectbackend.controllers;

import com.cmpt276project.projectbackend.models.Hydration;
import com.cmpt276project.projectbackend.models.HydrationRepository;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/hydration")
public class HydrationController {

private final HydrationRepository hydrationRepo;

public HydrationController(HydrationRepository hydrationRepo){
    this.hydrationRepo=hydrationRepo;
}

/* @GetMapping
public List<Hydration> getHydrations(){
    return hydrationRepo.findAll();
} */ 

@PostMapping
public ResponseEntity<Hydration> createHydrationRecord(@RequestBody Hydration hydrationRequest) {
    try {
        LocalDate intakeDate = LocalDate.now();
        int uid = hydrationRequest.getUid();
        int goal = hydrationRequest.getGoal();
        int intake = hydrationRequest.getIntake();

        // Check if a record already exists for the intake date and UID
        Optional<Hydration> existingRecord = hydrationRepo.findByIntakeDateAndUid(intakeDate, uid);
        if (existingRecord.isPresent()) {
            // Update the goal for the existing record
            Hydration existingHydration = existingRecord.get();
            existingHydration.setGoal(goal);
            Hydration updatedHydration = hydrationRepo.save(existingHydration);
            return ResponseEntity.ok(updatedHydration);
        } else {
            // Create a new record
            Hydration hydration = new Hydration(uid, goal, intake, intakeDate);
            Hydration savedHydration = hydrationRepo.save(hydration);
            return ResponseEntity.ok(savedHydration);
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}


@PostMapping("/update")
public ResponseEntity<Hydration> updateHydrationRecord(@RequestBody Hydration hydrationRequest) {
    try {
         
        System.out.println("testing update intake");

         String uidString = hydrationRequest.getUid().toString();
        long uid = Long.parseLong(uidString);

        LocalDate intakeDate = hydrationRequest.getintakeDate();  
       LocalDate indate = LocalDate.now();

        Hydration existingRecord = hydrationRepo.findByUidAndIntakeDate(uid, intakeDate);

        if (existingRecord!=null) {
            existingRecord.setIntake(hydrationRequest.getIntake());
            Hydration updatedHydration = hydrationRepo.save(existingRecord);
            return ResponseEntity.ok(updatedHydration);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

@GetMapping("/goal")
public ResponseEntity<Map<String, Object>> getUserGoal(@RequestParam("uid") Long uid) {
    try {
        System.out.println("getting goal and intake"+uid);

        LocalDate indate = LocalDate.now();

        Hydration hydration = hydrationRepo.findByUidAndIntakeDate(uid, indate);
        if (hydration != null) {
            Map<String, Object> response = new HashMap<>();
            System.out.println("goal"+hydration.getIntake());
            response.put("goal", hydration.getGoal());
            response.put("intake", hydration.getIntake());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.ok().build();
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

@GetMapping("/test")
public List<Hydration> getIdHydrationsdateo() throws ParseException{
   
        Date d = new SimpleDateFormat("yyyy-MM-dd").parse("2023-07-03");
        List<Hydration> findByintakeDate = hydrationRepo.findByIntakeDate(d);
        return findByintakeDate;
}
}