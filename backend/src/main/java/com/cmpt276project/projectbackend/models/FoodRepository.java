package com.cmpt276project.projectbackend.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface FoodRepository extends JpaRepository<Food, Integer> {


    List<Food> findByUidAndDate(int userId, LocalDate foodDate);

    Optional<Food> findByUid(Integer id);

    Optional<Food> findById(Integer id);

    void deleteById(Integer id);    

   
}
