package com.comerbien.backend.controllers;

import com.comerbien.backend.entities.Recipe;
import com.comerbien.backend.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    // ... endpoints existentes ...

    @GetMapping("/global")
    public List<Recipe> getGlobalRecipes() {
        return recipeService.getGlobalRecipes();
    }

    @GetMapping("/user/{userId}")
    public List<Recipe> getUserRecipes(@PathVariable Long userId) {
        return recipeService.getUserRecipes(userId);
    }

    @GetMapping("/user/{userId}/personal")
    public List<Recipe> getUserPersonalRecipes(@PathVariable Long userId) {
        return recipeService.getUserPersonalRecipes(userId);
    }
}