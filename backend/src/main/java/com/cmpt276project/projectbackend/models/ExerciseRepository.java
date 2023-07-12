package com.cmpt276project.projectbackend.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;


public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    List<Exercise> findByUidAndExerDate(int userId, LocalDate exer_date);    

   
}
