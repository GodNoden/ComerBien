package com.comerbien.backend.controllers;

import com.comerbien.backend.entities.Recipe;
import com.comerbien.backend.services.RecipeService;
import com.comerbien.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @PostMapping("/user/{userId}/recipe/{recipeId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long userId, @PathVariable Long recipeId) {
        Optional<Recipe> recipeOpt = recipeService.getRecipeById(recipeId);
        if (recipeOpt.isPresent()) {
            userService.addFavoriteRecipe(userId, recipeOpt.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/user/{userId}/recipe/{recipeId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long userId, @PathVariable Long recipeId) {
        Optional<Recipe> recipeOpt = recipeService.getRecipeById(recipeId);
        if (recipeOpt.isPresent()) {
            userService.removeFavoriteRecipe(userId, recipeOpt.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public Set<Recipe> getFavorites(@PathVariable Long userId) {
        return userService.getFavoriteRecipes(userId);
    }
}