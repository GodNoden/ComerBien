import { Recipe, RecipeRequest, RecipeResponse } from '@/types';
import { apiClient } from './api';

export const recipeService = {
    // Obtener todas las recetas (públicas + del usuario)
    async getRecipes(token: string): Promise<RecipeResponse[]> {
        return apiClient.get('/recipes', token);
    },

    // Obtener recetas públicas
    async getPublicRecipes(): Promise<RecipeResponse[]> {
        return apiClient.get('/recipes/public');
    },

    // Obtener recetas del usuario actual
    async getUserRecipes(token: string): Promise<RecipeResponse[]> {
        return apiClient.get('/recipes/user', token);
    },

    // Obtener receta por ID
    async getRecipeById(id: number, token: string): Promise<RecipeResponse> {
        return apiClient.get(`/recipes/${id}`, token);
    },

    // Crear nueva receta
    async createRecipe(recipeData: RecipeRequest, token: string): Promise<RecipeResponse> {
        return apiClient.post('/recipes', recipeData, token);
    },

    // Actualizar receta
    async updateRecipe(id: number, recipeData: RecipeRequest, token: string): Promise<RecipeResponse> {
        return apiClient.put(`/recipes/${id}`, recipeData, token);
    },

    // Eliminar receta
    async deleteRecipe(id: number, token: string): Promise<boolean> {
        return apiClient.delete(`/recipes/${id}`, token);
    },

    // Filtrar recetas por categoría
    async getRecipesByCategory(category: string, token: string): Promise<RecipeResponse[]> {
        return apiClient.get(`/recipes/category/${category}`, token);
    },

    // Buscar recetas
    async searchRecipes(query: string, token: string): Promise<RecipeResponse[]> {
        return apiClient.get(`/recipes/search?q=${encodeURIComponent(query)}`, token);
    },

    // Obtener recetas filtradas por preferencias del usuario
    async getFilteredRecipes(token: string): Promise<RecipeResponse[]> {
        return apiClient.get('/recipes/filtered', token);
    }
};