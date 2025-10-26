package com.comerbien.backend.model.dto.response;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class WeeklyMenuResponse {

    private Long id;
    private LocalDate weekStartDate;
    private UserResponse user;
    private Map<String, Map<String, List<RecipeResponse>>> dayMeals; // { "LUNES": { "BREAKFAST": [recipes] } }

    // Constructores
    public WeeklyMenuResponse() {
    }

    public WeeklyMenuResponse(Long id, LocalDate weekStartDate, UserResponse user) {
        this.id = id;
        this.weekStartDate = weekStartDate;
        this.user = user;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getWeekStartDate() {
        return weekStartDate;
    }

    public void setWeekStartDate(LocalDate weekStartDate) {
        this.weekStartDate = weekStartDate;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }

    public Map<String, Map<String, List<RecipeResponse>>> getDayMeals() {
        return dayMeals;
    }

    public void setDayMeals(Map<String, Map<String, List<RecipeResponse>>> dayMeals) {
        this.dayMeals = dayMeals;
    }
}
