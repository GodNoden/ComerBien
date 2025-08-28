import { Recipe } from '@/types/menu';

const API_BASE_URL = 'http://localhost:8081/api';

export const favoriteService = {
    async getFavorites(userId: number): Promise<Recipe[]> {
        const response = await fetch(`${API_BASE_URL}/favorites/user/${userId}`);
        if (!response.ok) {
            throw new Error('Error fetching favorites');
        }
        return response.json();
    },

    async addFavorite(userId: number, recipeId: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/favorites/user/${userId}/recipe/${recipeId}`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Error adding favorite');
        }
    },

    async removeFavorite(userId: number, recipeId: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/favorites/user/${userId}/recipe/${recipeId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error removing favorite');
        }
    },
};