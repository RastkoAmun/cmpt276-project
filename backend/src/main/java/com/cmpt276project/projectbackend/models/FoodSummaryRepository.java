package com.cmpt276project.projectbackend.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface FoodSummaryRepository extends JpaRepository<FoodSummary, Long> {
    Optional<FoodSummary> findByUidAndDate(Integer uid, LocalDate date);
    FoodSummary findById(long id);
}