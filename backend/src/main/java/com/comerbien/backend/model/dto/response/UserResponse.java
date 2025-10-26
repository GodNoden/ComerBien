package com.comerbien.backend.model.dto.response;

import com.comerbien.backend.model.enums.Tag;
import java.util.List;

public class UserResponse {
    
    private Long id;
    private String username;
    private String email;
    private List<Tag> dietaryPreferences;
    private List<String> excludedIngredients;

    // Constructores
    public UserResponse() {}

    public UserResponse(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public List<Tag> getDietaryPreferences() { return dietaryPreferences; }
    public void setDietaryPreferences(List<Tag> dietaryPreferences) { this.dietaryPreferences = dietaryPreferences; }

    public List<String> getExcludedIngredients() { return excludedIngredients; }
    public void setExcludedIngredients(List<String> excludedIngredients) { this.excludedIngredients = excludedIngredients; }
}
