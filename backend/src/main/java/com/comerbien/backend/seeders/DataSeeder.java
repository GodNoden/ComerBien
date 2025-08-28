package com.comerbien.backend.seeders;

import com.comerbien.backend.entities.Recipe;
import com.comerbien.backend.entities.User;
import com.comerbien.backend.repositories.RecipeRepository;
import com.comerbien.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0) {
            User user1 = new User();
            user1.setUsername("usuarioejemplo");
            user1.setEmail("usuario@ejemplo.com");
            user1.setPassword(passwordEncoder.encode("password123"));

            User user2 = new User();
            user2.setUsername("chefjuan");
            user2.setEmail("juan@chef.com");
            user2.setPassword(passwordEncoder.encode("cocina123"));

            userRepository.saveAll(List.of(user1, user2));
        }


        if (recipeRepository.count() == 0) {
            Recipe globalRecipe1 = new Recipe();
            globalRecipe1.setTitle("Ensalada César");
            globalRecipe1.setDescription("Una clásica ensalada César con pollo");
            globalRecipe1.setCalories(350);
            globalRecipe1.setProtein(25);
            globalRecipe1.setCarbs(10);
            globalRecipe1.setFat(25);
            globalRecipe1.setIngredients(Arrays.asList("Lechuga romana", "Pollo a la parrilla", "Queso parmesano", "Crutones", "Salsa César"));
            globalRecipe1.setSteps(Arrays.asList("Lavar y cortar la lechuga", "Cocinar el pollo y cortarlo en tiras", "Mezclar todos los ingredientes", "Añadir la salsa y mezclar"));
            globalRecipe1.setIsGlobal(true);

            Recipe globalRecipe2 = new Recipe();
            globalRecipe2.setTitle("Pasta Alfredo");
            globalRecipe2.setDescription("Pasta con salsa Alfredo cremosa");
            globalRecipe2.setCalories(450);
            globalRecipe2.setProtein(15);
            globalRecipe2.setCarbs(60);
            globalRecipe2.setFat(20);
            globalRecipe2.setIngredients(Arrays.asList("Pasta", "Crema", "Mantequilla", "Queso parmesano", "Ajo"));
            globalRecipe2.setSteps(Arrays.asList("Cocinar la pasta", "Preparar la salsa", "Mezclar y servir"));
            globalRecipe2.setIsGlobal(true);

            recipeRepository.saveAll(List.of(globalRecipe1, globalRecipe2));
        }
    }
}