package com.comerbien.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.comerbien.backend.model.dto.response.UserResponse;
import com.comerbien.backend.model.enums.Tag;
import com.comerbien.backend.security.CustomUserDetails;
import com.comerbien.backend.service.UserService;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8080")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getCurrentUserProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
        UserResponse user = userService.getUserProfile(userDetails.getUser().getId());
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateUserProfile(
            @RequestBody UserResponse userResponse,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        UserResponse updatedUser = userService.updateUserProfile(userDetails.getUser().getId(), userResponse);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/dietary-preferences")
    public ResponseEntity<UserResponse> updateDietaryPreferences(
            @RequestBody List<Tag> dietaryPreferences,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        UserResponse updatedUser = userService.updateDietaryPreferences(userDetails.getUser().getId(),
                dietaryPreferences);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/excluded-ingredients")
    public ResponseEntity<UserResponse> updateExcludedIngredients(
            @RequestBody List<String> excludedIngredients,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        UserResponse updatedUser = userService.updateExcludedIngredients(userDetails.getUser().getId(),
                excludedIngredients);
        return ResponseEntity.ok(updatedUser);
    }
}