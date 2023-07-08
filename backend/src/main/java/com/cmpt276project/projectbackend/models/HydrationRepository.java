package com.cmpt276project.projectbackend.models;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;



public interface HydrationRepository extends JpaRepository<Hydration, Long> {

   

  
    Hydration findByUid(Long id);

    List<Hydration> findByIntakeDate(Date intakDate);

    //List<Hydration> findByUidAndIntakeDate(Long uid, LocalDate intakDate);

    Hydration findByUidAndIntakeDate(long i, LocalDate intakDate);

    Optional<Hydration> findByIntakeDateAndUid(LocalDate intakeDate, int uid);
    
  
      

      
     

}
