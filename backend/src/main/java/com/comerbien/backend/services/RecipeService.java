package com.comerbien.backend.services;

import com.comerbien.backend.entities.Recipe;
import com.comerbien.backend.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }

    public List<Recipe> getGlobalRecipes() {
        return recipeRepository.findByIsGlobalTrue();
    }

    public List<Recipe> getUserRecipes(Long userId) {
        return recipeRepository.findByUserId(userId);
    }

    public List<Recipe> getUserPersonalRecipes(Long userId) {
        return recipeRepository.findByIsGlobalFalseAndUserId(userId);
    }
}