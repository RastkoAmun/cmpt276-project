package com.cmpt276project.projectbackend.models;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseSummaryRepository extends JpaRepository<ExerciseSummary, Long> {
    Optional<ExerciseSummary> findByUidAndExerSumDate(Integer uid, LocalDate exerSumDate);

    ExerciseSummary findById(long id);

    List<ExerciseSummary> findByUid(long uid);
}
