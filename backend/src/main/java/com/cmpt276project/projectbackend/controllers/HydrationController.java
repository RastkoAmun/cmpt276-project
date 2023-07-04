package com.cmpt276project.projectbackend.controllers;

import com.cmpt276project.projectbackend.models.Hydration;
import com.cmpt276project.projectbackend.models.HydrationRepository;


import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date intakeDate = new Date();
            String formattedIntakeDate = dateFormat.format(intakeDate) + " 00:00:00";
            intakeDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(formattedIntakeDate);
            Hydration hydration = new Hydration(hydrationRequest.getUid(), hydrationRequest.getGoal(), hydrationRequest.getIntake(), intakeDate);
            Hydration savedHydration = hydrationRepo.save(hydration);
            return ResponseEntity.ok(savedHydration);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

} 

@PostMapping("/update")
public ResponseEntity<Hydration> updateHydrationRecord(@RequestBody Hydration hydrationRequest) {
    try {
         String uidString = hydrationRequest.getUid().toString();
        long uid = Long.parseLong(uidString);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date intakeDate = hydrationRequest.getintakeDate();
        String formattedIntakeDate = dateFormat.format(intakeDate) + " 00:00:00";
        intakeDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(formattedIntakeDate);
            
        // Check if the hydration record exists for the given user ID and intake date
        Hydration existingRecord = hydrationRepo.findByUidAndIntakeDate(uid, intakeDate);

        if (existingRecord!=null) {
            // Update the intake value
            existingRecord.setIntake(hydrationRequest.getIntake());
            Hydration updatedHydration = hydrationRepo.save(existingRecord);
            return ResponseEntity.ok(updatedHydration);
        } else {
            // No record found for the given user ID and intake date
            return ResponseEntity.notFound().build();
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