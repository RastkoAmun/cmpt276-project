package com.cmpt276project.projectbackend.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;


public interface SleepRepository extends JpaRepository<Sleep, Long> {    

    Sleep findByUid(Long id);

    List<Sleep> findByDateAfter(LocalDate fiveDaysAgo);

    List<Sleep> findByDate(LocalDate fiveDaysAgo);

    List<Sleep> findByUidAndDateAfter(Long uid, LocalDate intakeDate);

    List<Sleep> findByUidAndDateAfterOrderByDateAsc(Long uid, LocalDate fiveDaysAgo);

    Sleep findByDateAndUid(LocalDate date, Integer uid);
}
