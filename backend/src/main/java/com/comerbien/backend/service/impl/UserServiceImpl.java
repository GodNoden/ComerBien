package com.comerbien.backend.service.impl;

import org.springframework.stereotype.Service;

import com.comerbien.backend.exception.ResourceNotFoundException;
import com.comerbien.backend.model.dto.response.UserResponse;
import com.comerbien.backend.model.entity.User;
import com.comerbien.backend.model.enums.Tag;
import com.comerbien.backend.repository.UserRepository;
import com.comerbien.backend.service.UserService;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return convertToResponse(user);
    }

    @Override
    public UserResponse updateUserProfile(Long userId, UserResponse userResponse) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Actualizar campos permitidos
        if (userResponse.getEmail() != null && !userResponse.getEmail().equals(user.getEmail())) {
            // Verificar que el email no esté en uso
            if (userRepository.existsByEmail(userResponse.getEmail())) {
                throw new RuntimeException("Email is already in use");
            }
            user.setEmail(userResponse.getEmail());
        }

        User updatedUser = userRepository.save(user);
        return convertToResponse(updatedUser);
    }

    @Override
    public UserResponse updateDietaryPreferences(Long userId, List<Tag> dietaryPreferences) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setDietaryPreferences(dietaryPreferences);
        User updatedUser = userRepository.save(user);
        return convertToResponse(updatedUser);
    }

    @Override
    public UserResponse updateExcludedIngredients(Long userId, List<String> excludedIngredients) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setExcludedIngredients(excludedIngredients);
        User updatedUser = userRepository.save(user);
        return convertToResponse(updatedUser);
    }

    private UserResponse convertToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setDietaryPreferences(user.getDietaryPreferences());
        response.setExcludedIngredients(user.getExcludedIngredients());
        return response;
    }
}