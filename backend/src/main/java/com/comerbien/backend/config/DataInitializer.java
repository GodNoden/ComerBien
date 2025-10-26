package com.comerbien.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.comerbien.backend.model.entity.User;
import com.comerbien.backend.model.enums.Tag;
import com.comerbien.backend.repository.UserRepository;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Crear usuario de prueba si no existe
        if (userRepository.findByUsername("testuser").isEmpty()) {
            User testUser = new User();
            testUser.setUsername("testuser");
            testUser.setEmail("test@example.com");
            testUser.setPassword(passwordEncoder.encode("password123"));
            testUser.setDietaryPreferences(Arrays.asList(Tag.ALTA_PROTEINA, Tag.BAJOS_EN_CARBOS));
            testUser.setExcludedIngredients(Arrays.asList("cebolla", "ajo"));

            userRepository.save(testUser);
            System.out.println("Usuario de prueba creado: testuser / password123");
        }
    }
}
