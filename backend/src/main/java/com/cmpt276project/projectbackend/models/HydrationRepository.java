package com.cmpt276project.projectbackend.models;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;



public interface HydrationRepository extends JpaRepository<Hydration, Long> {
    Hydration findByUid(Integer uid);
    List<Hydration> findByIntakeDate(String sellDate);
    Hydration findByUidAndIntakeDate(Integer uid, String intakeDate);
}
