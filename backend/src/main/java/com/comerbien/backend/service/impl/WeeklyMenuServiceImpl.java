package com.comerbien.backend.service.impl;

import org.springframework.stereotype.Service;
import com.comerbien.backend.model.dto.response.WeeklyMenuResponse;
import com.comerbien.backend.exception.ResourceNotFoundException;
import com.comerbien.backend.model.dto.response.DayMealsResponse;
import com.comerbien.backend.model.dto.response.RecipeResponse;
import com.comerbien.backend.model.dto.response.UserResponse;
import com.comerbien.backend.model.entity.WeeklyMenu;
import com.comerbien.backend.model.entity.DayMeal;
import com.comerbien.backend.model.entity.Recipe;
import com.comerbien.backend.model.entity.User;
import com.comerbien.backend.model.enums.DayOfWeek; // Nuestro enum
import com.comerbien.backend.model.enums.MealType;
import com.comerbien.backend.repository.WeeklyMenuRepository;
import com.comerbien.backend.repository.DayMealRepository;
import com.comerbien.backend.repository.RecipeRepository;
import com.comerbien.backend.repository.UserRepository;
import com.comerbien.backend.service.WeeklyMenuService;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class WeeklyMenuServiceImpl implements WeeklyMenuService {

    private final WeeklyMenuRepository weeklyMenuRepository;
    private final DayMealRepository dayMealRepository;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public WeeklyMenuServiceImpl(WeeklyMenuRepository weeklyMenuRepository,
                               DayMealRepository dayMealRepository,
                               UserRepository userRepository,
                               RecipeRepository recipeRepository) {
        this.weeklyMenuRepository = weeklyMenuRepository;
        this.dayMealRepository = dayMealRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
    }

    @Override
    public WeeklyMenuResponse getOrCreateWeeklyMenu(Long userId, LocalDate weekStartDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Normalizar la fecha al inicio de la semana (lunes) usando fully qualified name
        LocalDate normalizedDate = weekStartDate.with(java.time.DayOfWeek.MONDAY);

        Optional<WeeklyMenu> existingMenu = weeklyMenuRepository.findByUserIdAndWeekStartDate(userId, normalizedDate);
        
        if (existingMenu.isPresent()) {
            return convertToResponse(existingMenu.get());
        }

        // Crear nuevo menú semanal
        WeeklyMenu newMenu = new WeeklyMenu(normalizedDate, user);
        WeeklyMenu savedMenu = weeklyMenuRepository.save(newMenu);
        
        return convertToResponse(savedMenu);
    }

    @Override
    public WeeklyMenuResponse getWeeklyMenu(Long menuId, Long userId) {
        WeeklyMenu menu = weeklyMenuRepository.findById(menuId)
                .orElseThrow(() -> new ResourceNotFoundException("Weekly menu not found with id: " + menuId));

        if (!menu.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only access your own weekly menus");
        }

        return convertToResponse(menu);
    }

    @Override
    public List<WeeklyMenuResponse> getUserWeeklyMenus(Long userId) {
        return weeklyMenuRepository.findByUserId(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public WeeklyMenuResponse addRecipeToMenu(Long menuId, DayOfWeek dayOfWeek, MealType mealType, Long recipeId, Long userId) {
        WeeklyMenu menu = weeklyMenuRepository.findById(menuId)
                .orElseThrow(() -> new ResourceNotFoundException("Weekly menu not found with id: " + menuId));

        if (!menu.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only modify your own weekly menus");
        }

        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + recipeId));

        // Verificar si ya existe una comida en este slot
        Optional<DayMeal> existingMeal = dayMealRepository.findByWeeklyMenuIdAndDayOfWeekAndMealType(menuId, dayOfWeek, mealType);
        
        DayMeal dayMeal;
        if (existingMeal.isPresent()) {
            dayMeal = existingMeal.get();
            dayMeal.setRecipe(recipe);
        } else {
            dayMeal = new DayMeal(dayOfWeek, mealType, recipe, menu);
        }

        dayMealRepository.save(dayMeal);
        
        // Refrescar el menú para obtener las relaciones actualizadas
        WeeklyMenu updatedMenu = weeklyMenuRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Weekly menu not found after update"));
        
        return convertToResponse(updatedMenu);
    }

    @Override
    public WeeklyMenuResponse removeRecipeFromMenu(Long menuId, DayOfWeek dayOfWeek, MealType mealType, Long userId) {
        WeeklyMenu menu = weeklyMenuRepository.findById(menuId)
                .orElseThrow(() -> new ResourceNotFoundException("Weekly menu not found with id: " + menuId));

        if (!menu.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only modify your own weekly menus");
        }

        DayMeal dayMeal = dayMealRepository.findByWeeklyMenuIdAndDayOfWeekAndMealType(menuId, dayOfWeek, mealType)
                .orElseThrow(() -> new RuntimeException("Meal not found for the specified day and type"));

        dayMealRepository.delete(dayMeal);
        
        // Refrescar el menú
        WeeklyMenu updatedMenu = weeklyMenuRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Weekly menu not found after update"));
        
        return convertToResponse(updatedMenu);
    }

    @Override
    public void deleteWeeklyMenu(Long menuId, Long userId) {
        WeeklyMenu menu = weeklyMenuRepository.findById(menuId)
                .orElseThrow(() -> new ResourceNotFoundException("Weekly menu not found with id: " + menuId));

        if (!menu.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only delete your own weekly menus");
        }

        weeklyMenuRepository.delete(menu);
    }

    @Override
    public DayMealsResponse getDayMeals(Long menuId, DayOfWeek dayOfWeek, Long userId) {
        WeeklyMenu menu = weeklyMenuRepository.findById(menuId)
                .orElseThrow(() -> new ResourceNotFoundException("Weekly menu not found with id: " + menuId));

        if (!menu.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only access your own weekly menus");
        }

        List<DayMeal> dayMeals = dayMealRepository.findByWeeklyMenuIdAndDayOfWeek(menuId, dayOfWeek);
        
        DayMealsResponse response = new DayMealsResponse();
        
        // Agrupar por tipo de comida
        for (DayMeal dayMeal : dayMeals) {
            RecipeResponse recipeResponse = convertToRecipeResponse(dayMeal.getRecipe());
            
            switch (dayMeal.getMealType()) {
                case DESAYUNO:
                    if (response.getDesayuno() == null) {
                        response.setDesayuno(new ArrayList<>());
                    }
                    response.getDesayuno().add(recipeResponse);
                    break;
                case COMIDA:
                    if (response.getComida() == null) {
                        response.setComida(new ArrayList<>());
                    }
                    response.getComida().add(recipeResponse);
                    break;
                case CENA:
                    if (response.getCena() == null) {
                        response.setCena(new ArrayList<>());
                    }
                    response.getCena().add(recipeResponse);
                    break;
                case SNACK:
                    if (response.getSnack() == null) {
                        response.setSnack(new ArrayList<>());
                    }
                    response.getSnack().add(recipeResponse);
                    break;
            }
        }

        return response;
    }

    @Override
    public WeeklyMenuResponse getCurrentWeekMenu(Long userId) {
        LocalDate today = LocalDate.now();
        // Usando fully qualified name para evitar conflicto
        LocalDate weekStart = today.with(java.time.DayOfWeek.MONDAY);
        
        return getOrCreateWeeklyMenu(userId, weekStart);
    }

    private WeeklyMenuResponse convertToResponse(WeeklyMenu menu) {
        WeeklyMenuResponse response = new WeeklyMenuResponse();
        response.setId(menu.getId());
        response.setWeekStartDate(menu.getWeekStartDate());
        
        UserResponse userResponse = new UserResponse();
        userResponse.setId(menu.getUser().getId());
        userResponse.setUsername(menu.getUser().getUsername());
        userResponse.setEmail(menu.getUser().getEmail());
        response.setUser(userResponse);

        // Organizar las comidas por día y tipo
        Map<String, Map<String, List<RecipeResponse>>> dayMealsMap = new HashMap<>();
        
        for (DayOfWeek day : DayOfWeek.values()) {
            Map<String, List<RecipeResponse>> mealsByType = new HashMap<>();
            
            for (MealType mealType : MealType.values()) {
                List<DayMeal> meals = menu.getDayMeals().stream()
                        .filter(dm -> dm.getDayOfWeek() == day && dm.getMealType() == mealType)
                        .collect(Collectors.toList());
                
                List<RecipeResponse> recipes = meals.stream()
                        .map(dm -> convertToRecipeResponse(dm.getRecipe()))
                        .collect(Collectors.toList());
                
                mealsByType.put(mealType.name(), recipes);
            }
            
            dayMealsMap.put(day.name(), mealsByType);
        }
        
        response.setDayMeals(dayMealsMap);
        return response;
    }

    private RecipeResponse convertToRecipeResponse(Recipe recipe) {
        RecipeResponse response = new RecipeResponse();
        response.setId(recipe.getId());
        response.setTitle(recipe.getTitle());
        response.setTime(recipe.getTime());
        response.setDifficulty(recipe.getDifficulty());
        response.setImage(recipe.getImage());
        response.setCategory(recipe.getCategory());
        response.setCalories(recipe.getCalories());
        response.setProtein(recipe.getProtein());
        response.setCarbs(recipe.getCarbs());
        response.setFat(recipe.getFat());
        response.setTags(recipe.getTags());
        response.setIngredients(recipe.getIngredients());
        response.setInstructions(recipe.getInstructions());
        response.setIsPublic(recipe.getIsPublic());
        
        return response;
    }
}
