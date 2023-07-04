package com.cmpt276project.projectbackend.models;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;



public interface HydrationRepository extends JpaRepository<Hydration, Long> {

   

  
    Hydration findByUid(Long id);

    List<Hydration> findByIntakeDate(Date sellDate);

    List<Hydration> findByUidAndIntakeDate(int i, Date sellDate);

    Hydration findByUidAndIntakeDate(long i, Date sellDate);
    
  
      

      
     

}
