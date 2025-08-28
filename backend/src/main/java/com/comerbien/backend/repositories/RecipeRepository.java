package com.comerbien.backend.repositories;

import com.comerbien.backend.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByUserId(Long userId);

    List<Recipe> findByIsGlobalTrue();

    List<Recipe> findByIsGlobalFalseAndUserId(Long userId);
}