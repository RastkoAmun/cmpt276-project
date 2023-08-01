package com.cmpt276project.projectbackend.controllers;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cmpt276project.projectbackend.models.WeightRepository;

import jakarta.servlet.http.HttpServletResponse;

import com.cmpt276project.projectbackend.models.Weight;

@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/weight")
public class WeightController {
  @Autowired
  private WeightRepository weightRepo;

  record WeightRequest(int uid, int weightId, double weight, boolean reverse, LocalDate date) {
  }

  record WeightResponseObject(List<Weight> weightHistory) {

  }

  @PostMapping
  public WeightResponseObject getWeightHistory(@RequestBody WeightRequest request) {
    List<Weight> weightList = weightRepo.findAllByUid(request.uid());

    if (request.reverse() && request.reverse() == true) {
      Collections.sort(weightList, Collections.reverseOrder());
    } else {
      Collections.sort(weightList);
    }

    return new WeightResponseObject(weightList);
  }

  @PostMapping("/add")
  public Weight addWeight(@RequestBody WeightRequest request, HttpServletResponse res) throws IOException {
    try {
      Weight newWeight = new Weight(request.uid(), request.weight(), request.date());
      weightRepo.save(newWeight);
      return newWeight;
    } catch (Exception e) {
      res.sendError(400, e.getMessage());
      return null;
    }
  }

  @DeleteMapping("/delete")
  public void deleteWeight(@RequestBody WeightRequest request, HttpServletResponse res) throws IOException {
    Weight weight = weightRepo.findById(request.weightId()).orElse(null);
    if (weight == null) {
      res.sendError(400, "Weight entry with specified ID does not exist");
      return;
    }

    weightRepo.delete(weight);
    res.setStatus(200);
    return;
  }
}
