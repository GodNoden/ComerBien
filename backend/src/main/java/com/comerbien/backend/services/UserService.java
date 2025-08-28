package com.comerbien.backend.services;

import com.comerbien.backend.entities.Recipe;
import com.comerbien.backend.entities.User;
import com.comerbien.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void addFavoriteRecipe(Long userId, Recipe recipe) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.getFavoriteRecipes().add(recipe);
            userRepository.save(user);
        }
    }

    public void removeFavoriteRecipe(Long userId, Recipe recipe) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.getFavoriteRecipes().remove(recipe);
            userRepository.save(user);
        }
    }

    public Set<Recipe> getFavoriteRecipes(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.map(User::getFavoriteRecipes).orElse(Set.of());
    }
}