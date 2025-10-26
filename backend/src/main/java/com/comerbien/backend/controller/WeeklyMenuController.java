package com.comerbien.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.comerbien.backend.model.dto.response.WeeklyMenuResponse;
import com.comerbien.backend.model.dto.response.DayMealsResponse;
import com.comerbien.backend.model.enums.DayOfWeek;
import com.comerbien.backend.model.enums.MealType;
import com.comerbien.backend.security.CustomUserDetails;
import com.comerbien.backend.service.WeeklyMenuService;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/menus")
@CrossOrigin(origins = "http://localhost:8080")
public class WeeklyMenuController {

    private final WeeklyMenuService weeklyMenuService;

    public WeeklyMenuController(WeeklyMenuService weeklyMenuService) {
        this.weeklyMenuService = weeklyMenuService;
    }

    @GetMapping("/current")
    public ResponseEntity<WeeklyMenuResponse> getCurrentWeekMenu(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        WeeklyMenuResponse menu = weeklyMenuService.getCurrentWeekMenu(userDetails.getUser().getId());
        return ResponseEntity.ok(menu);
    }

    @PostMapping("/week/{weekStartDate}")
    public ResponseEntity<WeeklyMenuResponse> getOrCreateWeeklyMenu(
            @PathVariable LocalDate weekStartDate,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        WeeklyMenuResponse menu = weeklyMenuService.getOrCreateWeeklyMenu(userDetails.getUser().getId(), weekStartDate);
        return ResponseEntity.ok(menu);
    }

    @GetMapping("/{menuId}")
    public ResponseEntity<WeeklyMenuResponse> getWeeklyMenu(
            @PathVariable Long menuId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        WeeklyMenuResponse menu = weeklyMenuService.getWeeklyMenu(menuId, userDetails.getUser().getId());
        return ResponseEntity.ok(menu);
    }

    @GetMapping
    public ResponseEntity<List<WeeklyMenuResponse>> getUserWeeklyMenus(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<WeeklyMenuResponse> menus = weeklyMenuService.getUserWeeklyMenus(userDetails.getUser().getId());
        return ResponseEntity.ok(menus);
    }

    @PostMapping("/{menuId}/days/{dayOfWeek}/meals/{mealType}/recipes/{recipeId}")
    public ResponseEntity<WeeklyMenuResponse> addRecipeToMenu(
            @PathVariable Long menuId,
            @PathVariable DayOfWeek dayOfWeek,
            @PathVariable MealType mealType,
            @PathVariable Long recipeId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        WeeklyMenuResponse menu = weeklyMenuService.addRecipeToMenu(menuId, dayOfWeek, mealType, recipeId,
                userDetails.getUser().getId());
        return ResponseEntity.ok(menu);
    }

    @DeleteMapping("/{menuId}/days/{dayOfWeek}/meals/{mealType}")
    public ResponseEntity<WeeklyMenuResponse> removeRecipeFromMenu(
            @PathVariable Long menuId,
            @PathVariable DayOfWeek dayOfWeek,
            @PathVariable MealType mealType,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        WeeklyMenuResponse menu = weeklyMenuService.removeRecipeFromMenu(menuId, dayOfWeek, mealType,
                userDetails.getUser().getId());
        return ResponseEntity.ok(menu);
    }

    @GetMapping("/{menuId}/days/{dayOfWeek}")
    public ResponseEntity<DayMealsResponse> getDayMeals(
            @PathVariable Long menuId,
            @PathVariable DayOfWeek dayOfWeek,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        DayMealsResponse dayMeals = weeklyMenuService.getDayMeals(menuId, dayOfWeek, userDetails.getUser().getId());
        return ResponseEntity.ok(dayMeals);
    }

    @DeleteMapping("/{menuId}")
    public ResponseEntity<Void> deleteWeeklyMenu(
            @PathVariable Long menuId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        weeklyMenuService.deleteWeeklyMenu(menuId, userDetails.getUser().getId());
        return ResponseEntity.noContent().build();
    }
}