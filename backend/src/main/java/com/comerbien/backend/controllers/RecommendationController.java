package com.comerbien.backend.controllers;

import com.comerbien.backend.dtos.RecommendationRequest;
import com.comerbien.backend.entities.Recipe;
import com.comerbien.backend.services.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @PostMapping
    public ResponseEntity<List<Recipe>> getRecommendations(@RequestBody RecommendationRequest request) {
        List<Recipe> recommendations = recommendationService.recommendRecipes(
            request.getGoal(), 
            request.getWeight(), 
            request.getHeight()
        );
        return ResponseEntity.ok(recommendations);
    }
}