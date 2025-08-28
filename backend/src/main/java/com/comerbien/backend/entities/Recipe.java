package com.comerbien.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "recipes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    private String description;
    private Integer calories;
    private Integer protein;
    private Integer carbs;
    private Integer fat;

    @ElementCollection
    private List<String> ingredients;

    @ElementCollection
    private List<String> steps;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    private Boolean isGlobal = false;

    public boolean isGlobal() {
        return Boolean.TRUE.equals(isGlobal);
    }
}