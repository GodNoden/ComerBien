package com.comerbien.backend.services;

import com.comerbien.backend.entities.Recipe;
import com.comerbien.backend.repositories.RecipeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> recommendRecipes(String goal, double weight, double height) {
        List<Recipe> allRecipes = recipeRepository.findAll();
        double bmi = weight / (height * height);

        return allRecipes.stream()
            .filter(recipe -> {
                switch (goal) {
                    case "lose":
                        return recipe.getCalories() < 400 && recipe.getProtein() > 15;
                    case "gain":
                        return recipe.getCalories() > 600 && recipe.getProtein() > 25;
                    default:
                        return recipe.getCalories() >= 400 && recipe.getCalories() <= 600;
                }
            })
            .collect(Collectors.toList());
    }
}