// RecommendationRequest.java
package com.comerbien.backend.dtos;

import lombok.Data;

@Data
public class RecommendationRequest {
    private String goal; // "lose", "maintain", "gain"
    private double weight;
    private double height;
}