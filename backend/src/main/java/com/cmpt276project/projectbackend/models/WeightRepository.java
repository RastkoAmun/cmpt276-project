package com.cmpt276project.projectbackend.models;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WeightRepository extends JpaRepository<Weight, Integer> {
  List<Weight> findAllByUid(int uid);
}
