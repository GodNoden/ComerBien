package com.comerbien.backend.controllers;

import com.comerbien.backend.entities.Recipe;
import com.comerbien.backend.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeService.getRecipeById(id);
        return recipe.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok().build();
    }

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