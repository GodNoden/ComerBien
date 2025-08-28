import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { useAuth } from '@/contexts/AuthContext';
import { favoriteService } from '@/services/favoriteService';
import { Recipe } from '@/types/menu';

interface FavoriteRecipesProps {
    onAddToWeeklyMenu?: (recipeId: number, recipeTitle: string) => void;
}

const FavoriteRecipes = ({ onAddToWeeklyMenu }: FavoriteRecipesProps) => {
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
    const { user, token, isAuthenticated, login, logout } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user) {
            loadFavorites();
        }
    }, [isAuthenticated, user]);

    if (!isAuthenticated) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Please log in to view your favorites</p>
            </div>
        );
    }

    const loadFavorites = async () => {
        try {
            const favorites = await favoriteService.getFavorites(user.id);
            setFavoriteRecipes(favorites);
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const handleToggleFavorite = async (recipeId: number) => {
        if (!user) return;

        try {
            await favoriteService.removeFavorite(user.id, recipeId);
            setFavoriteRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    if (favoriteRecipes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No favorite recipes yet</p>
                <p className="text-gray-400 text-sm mt-2">Start adding recipes to your favorites by clicking the heart icon</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    isFavorite={true}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToWeeklyMenu={onAddToWeeklyMenu}
                />
            ))}
        </div>
    );
};

export default FavoriteRecipes;